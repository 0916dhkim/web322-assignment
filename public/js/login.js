import { FormValidator } from "./validation.js";

const formValidator = new FormValidator(["email", "password"]);

formValidator.setValidator("email", (value) => {
  if (!value) return "Email is a required field.";
});

formValidator.setValidator("password", (value) => {
  if (!value) return "Password is a required field.";
});

const loginForm = document.querySelector("form.login-form");

const onSubmit = async (e) => {
  e.preventDefault();

  // Validate
  const valid = formValidator.validate();

  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formValidator.getValue("email"),
      password: formValidator.getValue("password"),
    }),
  });

  window.location.replace("/dashboard");
};

loginForm.addEventListener("submit", onSubmit);
