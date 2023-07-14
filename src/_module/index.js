trans_arr.push(
  "Mr_dot is <i><a class=\"link\" href=\"https://ma.kak.si/author\">my (author)</a></i> second website with current projects on my lead",
  "Мистер_точка это <i><a class=\"link\" href=\"https://ma.kak.si/author\">мой (автор)</a></i> второй сайт с проектами которые я сейчас возглавляю",
);
  
document.getElementById("imgs").querySelectorAll("img")[0].addEventListener("click", () => {
  hrefTo("https://mr.kak.si");
}, false);
document.getElementById("imgs").querySelectorAll("img")[1].addEventListener("click", () => {
  hrefTo("https://ma.kak.si");
}, false);