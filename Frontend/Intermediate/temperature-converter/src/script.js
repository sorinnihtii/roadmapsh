const dropdowns = document.querySelectorAll(".dropdown");

const temperature_input = document.getElementById("temperature-value");
const unit1_input = document.getElementById("inputUnit");
const unit2_input = document.getElementById("outputUnit");

function openDropdown(menu, arrow) {
  menu.setAttribute("data-open", "true");
  arrow.classList.add("open");
}

function closeDropdown(menu, arrow) {
  menu.setAttribute("data-open", "false");
  arrow.classList.remove("open");
}

function closeAllDropdowns() {
  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".dropdown-menu");
    const arrow = dropdown.querySelector(".dropdown-arrow");
    closeDropdown(menu, arrow);
  });
}

function switchInputs() {
  if (unit1_input.textContent === unit2_input.textContent) return;
  const unit1 = unit1_input.textContent;
  unit1_input.textContent = unit2_input.textContent;
  unit2_input.textContent = unit1;
}

function convert(inputValue, inputUnit, outputUnit) {
  if (inputUnit === "Fahrenheit" && outputUnit === "Celsius")
    return ((inputValue - 32) * 5) / 9;
  if (inputUnit === "Fahrenheit" && outputUnit === "Kelvin")
    return ((inputValue - 32) * 5) / 9 + 273.15;
  if (inputUnit === "Celsius" && outputUnit === "Fahrenheit")
    return (inputValue * 9) / 5 + 32;
  if (inputUnit === "Celsius" && outputUnit === "Kelvin")
    return inputValue + 273.15;
  if (inputUnit === "Kelvin" && outputUnit === "Fahrenheit")
    return ((inputValue - 273.15) * 9) / 5 + 32;
  if (inputUnit === "Kelvin" && outputUnit === "Celsius")
    return inputValue - 273.15;
}

function submit() {
  const initialInput = temperature_input.value;
  const inputUnit = unit1_input.textContent;
  const outputUnit = unit2_input.textContent;
  const displayResult = document.getElementById("result");

  let inputValue = 0;
  if (initialInput) inputValue = parseFloat(initialInput);

  const result = convert(inputValue, inputUnit, outputUnit);
  const rounded = result.toFixed(2);

  displayResult.textContent =
    inputValue + " " + inputUnit + " is " + rounded + " " + outputUnit;
}

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const display = dropdown.querySelector(".dropdown-display");
  const arrow = dropdown.querySelector(".dropdown-arrow");
  const menu = dropdown.querySelector(".dropdown-menu");
  const options = dropdown.querySelectorAll(".dropdown-option");

  toggle.addEventListener("click", () => {
    if (menu.getAttribute("data-open") == "false") {
      closeAllDropdowns();
      openDropdown(menu, arrow);
    } else {
      closeDropdown(menu, arrow);
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((a) => a.setAttribute("data-selected", "false"));
      option.setAttribute("data-selected", "true");

      const selectedOption = option.querySelector("p").textContent;

      // prettier-ignore
      if (
        (display.id === "inputUnit" && selectedOption === outputUnit.textContent) ||
        (display.id === "outputUnit" && selectedOption === inputUnit.textContent)
      ) {
        switchInputs();
      } 
      else display.textContent = selectedOption;

      submit();
      closeDropdown(menu, arrow);
    });
  });
});

document.addEventListener("DOMContentLoaded", submit);
temperature_input.addEventListener("input", submit);
