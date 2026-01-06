const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPassword = document.getElementById("showPassword");
const showConfirmPassword = document.getElementById("showConfirmPassword");

showPassword.addEventListener("click", () => {
  if (password.type === "password") password.type = "text";
  else password.type = "password";
});

showConfirmPassword.addEventListener("click", () => {
  if (confirmPassword.type === "password") confirmPassword.type = "text";
  else confirmPassword.type = "password";
});
