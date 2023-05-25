trans_arr.push(
  "hey", "хай",
);

window.onload = () => {
  setTimeout(() => {
    document.getElementById("svg").contentDocument.querySelector("svg").style.fill = "var(--primary-text-color)";
  }, 5000);
}