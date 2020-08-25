const socket = io();
moment.locale("fr");

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("message-input");
const home = document.getElementById("home");
const online = document.getElementById("online");
const users = document.getElementById("users");
const logout = document.getElementById("logout");
const modalContainer = document.getElementById("modal-container");
const cancelBtn = document.getElementById("cancel");
const usersConnected = document.getElementById("users-connected");
const onlineUsers = document.getElementById("online-users");

home.addEventListener("click", showHomeView);
online.addEventListener("click", showOnlineView);
logout.addEventListener("click", showLogoutModal);
cancelBtn.addEventListener("click", hideLogoutModal);
input.addEventListener("keyup", typing);
form.addEventListener("submit", sendMessage);

function showHomeView() {
  home.classList.add("active");
  messages.style.display = "flex";
  form.style.display = "flex";

  online.classList.remove("active");
  users.style.display = "none";
}

function showOnlineView() {
  online.classList.add("active");
  users.style.display = "block";

  home.classList.remove("active");
  messages.style.display = "none";
  form.style.display = "none";
}

function showLogoutModal() {
  modalContainer.classList.add("active");
}

function hideLogoutModal() {
  modalContainer.classList.remove("active");
}

function typing() {
  socket.emit("typing", {
    user,
    inputVal: input.value,
  });
}

socket.on("typing", ({ message, inputVal }) => {
  if (!document.querySelector(".typing")) {
    const div = document.createElement("div");
    div.classList.add("typing");

    div.innerHTML = `
    <p>
      ${message}
      <span class="one">.</span>
      <span class="two">.</span>
      <span class="three">.</span>
    </p>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
  }
  if (inputVal.length === 0) {
    document.querySelector(".typing").remove();
  }
});

function sendMessage(e) {
  e.preventDefault();
  if (input.value !== "") {
    const div = document.createElement("div");
    div.classList.add("own-message");
    div.innerHTML = `
    <p>${input.value}</p>
    <div class="date">${moment().format("LT")}</div>
    `;

    messages.appendChild(div);

    socket.emit("message", {
      user,
      body: input.value,
    });

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}

socket.on("message", (msg) => {
  messages.innerHTML += `
  <div class="message">
    <div class="sender">${msg.user}</div>
      <div class="body">
        <p>
          ${msg.body}
        </p>
      </div>
    <div class="date">${moment().format("LT")}</div>
  </div>
  `;

  if (document.querySelector(".typing")) {
    document.querySelector(".typing").remove();
  }

  messages.scrollTop = messages.scrollHeight;
});

socket.emit("userConnected", {
  user,
  genre,
});

socket.on("userConnected", (msg) => {
  messages.innerHTML += `
        <div class="notification">
            ${msg}
        </div>
    `;

  messages.scrollTop = messages.scrollHeight;
});

socket.emit("userDisconnected", {
  user,
  genre,
});

socket.on("userDisconnected", (msg) => {
  messages.innerHTML += `
  <div class="notification">
      ${msg}
  </div>
`;

  if (document.querySelector(".typing")) {
    document.querySelector(".typing").remove();
  }
  messages.scrollTop = messages.scrollHeight;
});

socket.on("usersConnected", (data) => (usersConnected.textContent = data));

socket.on("connectedUsers", (users) => {
  let output = "";
  for (let user of users) {
    output += `
    <div class="online-user">
      <div class="online"></div>
      <p>${user}</p>
    </div>
    `;
  }

  onlineUsers.innerHTML = output;
});
