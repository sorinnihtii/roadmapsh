const header = document.getElementById("header");
const display = document.getElementById("display");
const dropdown = document.getElementById("dropdown");

const listItems = document.querySelectorAll(".item");

header.addEventListener("click", () => {
  const open = dropdown.getAttribute("data-open");
  if (open == "false") dropdown.setAttribute("data-open", "true");
  else dropdown.setAttribute("data-open", "false");
});

document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target) && !header.contains(event.target)) {
    dropdown.setAttribute("data-open", "false");
  }
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    display.innerHTML = item.children[0].innerHTML;
    listItems.forEach((i) => {
      i.setAttribute("data-selected", "false");
    });
    item.setAttribute("data-selected", "true");
    dropdown.setAttribute("data-open", "false");
  });
});
