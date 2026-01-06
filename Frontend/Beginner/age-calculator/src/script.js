const { DateTime } = luxon;

const submit = document.getElementById("submit");
const now = DateTime.now();
const yourAge = document.getElementById("yourAge");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const bdatString = document.getElementById("bday").value;
  const bday = DateTime.fromISO(bdatString);
  const age = now.diff(bday, "years").years;
  
  if (bday == NaN || bday.invalid) alert("Please insert your full birthday");
  else if (bday > now || bday < DateTime.fromISO("1900"))
    alert("The birthdate must be between the year 1900 and today's date!");
  else yourAge.innerHTML = "You are: " + Math.floor(age) + " years old";
});
