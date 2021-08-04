const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", e => {
  e.preventDefault();
  console.log(checkValidation());
});

function checkValidation() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let validUsername = false;
  let validEmail = false;
  let validPassword = false;
  let validPassword2 = false;

  if(usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else {
    setSuccessFor(username);
    validUsername = true;
  }

  if(emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else {
    if(isVaildEmail(emailValue)) {
      setSuccessFor(email);
      validEmail = true;
    } else {
      setErrorFor(email, "Invalid email address");
    }
  }

  if(passwordValue.length < 6) { // password too short
    setErrorFor(password, "Password must contain 6 characters at least");
    if(password2Value.length < 6) { // password-Confirm too short
      setErrorFor(password2, "Password must contain 6 characters at least");
    } else {
      setErrorFor(password2, "Passwords does not match");
    }
  } else {
    setSuccessFor(password);
    validPassword = true;
    if(password2Value !== passwordValue) {
      setErrorFor(password2, "Passwords does not match");
    } else {
      setSuccessFor(password2);
      validPassword2 = true;
    }
  }

  console.log(validUsername, validEmail, validPassword, validPassword2);

  if(validUsername && validEmail && validPassword && validPassword2) {
    window.location.href = "success.html";
  }
}



function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.className = "form-control invalid";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control valid";
}

function isVaildEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
