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

function updateSelectedOption() {
  dropdowns.forEach((dropdown) => {
    const display = dropdown.querySelector(".dropdown-display");
    const options = dropdown.querySelectorAll(".dropdown-option");

    options.forEach((option) => {
      const selectedOption = option.querySelector(".option-name").textContent;

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

function convert(value, inputUnit, outputUnit) {
  if (inputUnit === "Fahrenheit" && outputUnit === "Celsius")
    return ((value - 32) * 5) / 9;
  if (inputUnit === "Fahrenheit" && outputUnit === "Kelvin")
    return ((value - 32) * 5) / 9 + 273.15;
  if (inputUnit === "Celsius" && outputUnit === "Fahrenheit")
    return (value * 9) / 5 + 32;
  if (inputUnit === "Kelvin" && outputUnit === "Fahrenheit")
    return ((value - 273.15) * 9) / 5 + 32;
  if (inputUnit === "Kelvin" && outputUnit === "Celsius") return value - 273.15;
  if (inputUnit === "Celsius" && outputUnit === "Kelvin") return value + 273.15;
}

function validateInput(value, unit) {
  if (unit === "Fahrenheit" && value < -459.67) {
    return -459.67;
  }
  if (unit === "Celsius" && value < -273.15) {
    return -273.15;
  }
  if (unit === "Kelvin" && value < 0) {
    return 0;
  }
  if (value) return value;

  return 0;
}

function showResult() {
  const initialInput = parseFloat(inputValueBox.value);
  const displayResult = document.getElementById("display-result");

  let inputValue = validateInput(initialInput, inputUnit);

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
      const selectedOption = option.querySelector(".option-name").textContent;

      if (
        (display.id === "input-unit-box" && selectedOption === outputUnit) ||
        (display.id === "output-unit-box" && selectedOption === inputUnit)
      ) {
        switchInputs();
      } else {
        if (display.id === "input-unit-box") inputUnit = selectedOption;
        else outputUnit = selectedOption;
      }

      updateSelectedOption();
      closeDropdown(menu, arrow);
      showResult();
    });
  });
});

document.addEventListener("DOMContentLoaded", showResult);
inputValueBox.addEventListener("input", () => {
  showResult();
});

inputValueBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.preventDefault();
});
