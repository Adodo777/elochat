const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");
const passwordError = document.getElementById("password-error");
const copyrightYear = document.getElementById("copyright-year");

copyrightYear.textContent = new Date().getFullYear();

loginForm.addEventListener("submit", sendForm);

function sendForm(e) {
  checkUsername(e);
  checkPassword(e);
}

function checkUsername(e) {
  const loginInputValue = loginInput.value.trim();

  if (loginInputValue.length === 0) {
    e.preventDefault();

    if (error.classList.contains("animate__animated", "animate__shakeX")) {
      return;
    } else {
      error.classList.add("animate__animated", "animate__shakeX");
      error.textContent = "Veuillez renseigner un pseudo";
    }

    setTimeout(() => {
      error.classList.remove("animate__animated", "animate__shakeX");
    }, 1500);
  } else if (loginInputValue.length >= 20) {
    e.preventDefault();

    if (error.classList.contains("animate__animated", "animate__shakeX")) {
      return;
    } else {
      error.classList.add("animate__animated", "animate__shakeX");
      error.textContent =
        "La longueur du pseudo doit être de 20 caractères maximum";
    }

    setTimeout(() => {
      error.classList.remove("animate__animated", "animate__shakeX");
    }, 1500);
  } else {
    error.textContent = "";
  }
}

function checkPassword(e) {
  const passwordInputValue = passwordInput.value.trim();

  if (passwordInputValue.length === 0) {
    e.preventDefault();

    if (
      passwordError.classList.contains("animate__animated", "animate__shakeX")
    ) {
      return;
    } else {
      passwordError.classList.add("animate__animated", "animate__shakeX");
      passwordError.textContent = "Veuillez indiquer un mot de passe";
    }

    setTimeout(() => {
      passwordError.classList.remove("animate__animated", "animate__shakeX");
    }, 1500);
  } else {
    passwordError.textContent = "";
  }
}
