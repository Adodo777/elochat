const registerForm = document.getElementById("register-form");
const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.getElementById("confirm-password-error");

registerForm.addEventListener("submit", sendForm);

function sendForm(e) {
  checkUsername(e);
  checkPassword(e);
}

function checkUsername(e) {
  const usernameInputValue = usernameInput.value.trim();

  if (usernameInputValue.length === 0) {
    e.preventDefault();

    if (
      usernameError.classList.contains("animate__animated", "animate__shakeX")
    ) {
      return;
    } else {
      usernameError.classList.add("animate__animated", "animate__shakeX");
      usernameError.textContent = "Veuillez renseigner un pseudo";
    }

    setTimeout(() => {
      usernameError.classList.remove("animate__animated", "animate__shakeX");
    }, 1500);
  } else if (usernameInputValue.length >= 20) {
    e.preventDefault();

    if (
      usernameError.classList.contains("animate__animated", "animate__shakeX")
    ) {
      return;
    } else {
      usernameError.classList.add("animate__animated", "animate__shakeX");
      usernameError.textContent =
        "La longueur du pseudo doit être de 20 caractères maximum";
    }

    setTimeout(() => {
      usernameError.classList.remove("animate__animated", "animate__shakeX");
    }, 1500);
  } else {
    usernameError.textContent = "";
  }
}

function checkPassword(e) {
  const passwordInputValue = password.value.trim();
  const confirmPasswordInputValue = confirmPassword.value.trim();

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

  if (passwordInputValue !== confirmPasswordInputValue) {
    e.preventDefault();

    if (
      confirmPasswordError.classList.contains(
        "animate__animated",
        "animate__shakeX"
      )
    ) {
      return;
    } else {
      confirmPasswordError.classList.add(
        "animate__animated",
        "animate__shakeX"
      );
      confirmPasswordError.textContent =
        "Les mots de passe ne sont pas identiques";
    }

    setTimeout(() => {
      confirmPasswordError.classList.remove(
        "animate__animated",
        "animate__shakeX"
      );
    }, 1500);
  } else {
    confirmPasswordError.textContent = "";
  }
}
