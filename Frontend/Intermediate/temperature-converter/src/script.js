const dropdowns = document.querySelectorAll(".dropdown");

const inputValueBox = document.getElementById("input-value-box");
let inputUnit = document.getElementById("input-unit-box").textContent;
let outputUnit = document.getElementById("output-unit-box").textContent;

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

function updateSelectedData() {
  dropdowns.forEach((dropdown) => {
    const display = dropdown.querySelector(".dropdown-display");
    const options = dropdown.querySelectorAll(".dropdown-option");

    options.forEach((option) => {
      const selectedOption = option.querySelector("p").textContent;

      if (
        (display.id === "input-unit-box" && selectedOption === inputUnit) ||
        (display.id === "output-unit-box" && selectedOption === outputUnit)
      ) {
        option.setAttribute("data-selected", "true");
        display.textContent = selectedOption;
      } else {
        option.setAttribute("data-selected", "false");
      }
    });
  });
}

function switchInputs() {
  if (inputUnit === outputUnit) return;
  const swap = inputUnit;
  inputUnit = outputUnit;
  outputUnit = swap;
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
  const initialInput = inputValueBox.value;
  const displayResult = document.getElementById("display-result");

  let inputValue = 0;
  if (initialInput) inputValue = parseFloat(initialInput);

  const result = convert(inputValue, inputUnit, outputUnit);
  console.log(inputValue, inputUnit, outputUnit, result);
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
      const selectedOption = option.querySelector("p").textContent;

      if (
        (display.id === "input-unit-box" && selectedOption === outputUnit) ||
        (display.id === "output-unit-box" && selectedOption === inputUnit)
      ) {
        switchInputs();
      } else {
        if (display.id === "input-unit-box") inputUnit = selectedOption;
        else outputUnit = selectedOption;
      }

      updateSelectedData();
      closeDropdown(menu, arrow);
      submit();
    });
  });
});

document.addEventListener("DOMContentLoaded", submit);
inputValueBox.addEventListener("input", submit);
