import { FormValidator } from "./validation.js";

const formValidator = new FormValidator([
  "email",
  "firstname",
  "lastname",
  "password",
  "password-confirm",
]);

formValidator.setValidator("email", (value) => {
  if (!value) return "Email is a required field.";
});

formValidator.setValidator("firstname", (value) => {
  if (!value) return "First name is a required field.";
});

formValidator.setValidator("lastname", (value) => {
  if (!value) return "Last name is a required field.";
});

formValidator.setValidator("password", (value) => {
  if (value.length < 8) return "Password should be at least 8 characters long.";
  if (!/^[-_#$0-9a-zA-Z]+$/.test(value)) {
    return "Password should only contain alphanumberic characters and -_#$.";
  }
});

formValidator.setValidator("password-confirm", (value) => {
  if (value !== formValidator.getValue("password")) {
    return "Password does not match.";
  }
});

const signupForm = document.querySelector("form.signup-form");

const onSubmit = async (e) => {
  e.preventDefault();

  // Validate
  const valid = formValidator.validate();

  if (!valid) return;

  const res = await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formValidator.getValue("email"),
      firstname: formValidator.getValue("firstname"),
      lastname: formValidator.getValue("lastname"),
      password: formValidator.getValue("password"),
    }),
  });

  // Redirect to home when sign-up is successful.
  window.location.replace(`/`);
};

signupForm.addEventListener("submit", onSubmit);
