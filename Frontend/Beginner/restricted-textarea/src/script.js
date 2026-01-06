input = document.getElementById("input");
container = document.getElementById("container");
currentLength = document.getElementById("currentLength");
maxLength = document.getElementById("maxLength");
max = input.maxLength;

maxLength.innerHTML = max;

input.addEventListener("input", () => {
  currentLength.innerHTML = input.value.length;
  if (input.value.length == max) {
    container.classList.add("maxed");
  } else container.classList.remove("maxed");
});
