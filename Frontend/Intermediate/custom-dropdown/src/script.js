const header = document.getElementById("header");
const display = document.getElementById("display");
const dropdown = document.getElementById("dropdown");

const listItems = document.querySelectorAll(".item");

header.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown-open");
});

document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target) && !header.contains(event.target)) {
    dropdown.classList.remove("dropdown-open");
  }
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    display.innerHTML = item.children[0].innerHTML;
    listItems.forEach((i) => {
      i.classList.remove("selected");
    });
    item.classList.add("selected");
    dropdown.classList.remove("dropdown-open");
  });
});
