const dropdowns = document.querySelectorAll(".dropdown");
const dropButtons = document.querySelectorAll(".drop-button");

dropButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const toBeShown = document.getElementById(button.dataset.tab);
    button.classList.toggle("shown");
    toBeShown.classList.toggle("shown");
  });
});
