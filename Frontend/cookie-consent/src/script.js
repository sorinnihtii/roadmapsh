function saveConsent(value) {
  localStorage.setItem("cookieConsent", value);
}

const consent = localStorage.getItem("cookieConsent");
const popup = document.getElementById("popup");
const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
  alert("cookies reset successfully, refresh the page");
  localStorage.removeItem("cookieConsent");
  reset.remove();
});

if (!consent) {
  const accept = document.getElementById("accept");
  const reject = document.getElementById("reject");

  accept.addEventListener("click", () => {
    popup.classList.remove("animate-popup");
    popup.classList.add("animate-away");
    popup.addEventListener("animationend", () => {
      popup.remove();
    });
    saveConsent("accepted");
  });

  reject.addEventListener("click", () => {
    popup.classList.remove("animate-popup");
    popup.classList.add("animate-away");
    popup.addEventListener("animationend", () => {
      popup.remove();
    });
    saveConsent("rejected");
  });
} else popup.remove();
