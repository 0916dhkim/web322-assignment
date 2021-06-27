import { FormValidator } from "./validation.js";

const formValidator = new FormValidator(["email", "password"]);

formValidator.setValidator("email", (value) => {
  if (!value) return "Email is a required field.";
});

formValidator.setValidator("password", (value) => {
  if (!value) return "Password is a required field.";
});

const loginForm = document.querySelector("form.login-form");

const onSubmit = (e) => {
  e.preventDefault();

  // Validate
  const valid = formValidator.validate();
};

loginForm.addEventListener("submit", onSubmit);
