const langBtn = document.getElementById("lang-btn");
const langEls = document.querySelectorAll('[data-translate]');

function RChange(el, after) {
    if (el.classList.contains("out")) {
        el.classList.remove("out");
    } else {
        el.classList.add("out");
    }
    setTimeout(() => {
        el.innerHTML = after;
    }, 250);
};

langBtn.addEventListener("click", () => {
    if (langBtn.innerHTML == "Ru") {
        RChange(langBtn, "En");
    } else {
        RChange(langBtn, "Ru");
    }
    langEls.forEach((e) => {
        e.innerHTML = translate(langBtn.innerHTML, e.innerHTML);
    });
});

const trans_arr = [
    "Buisnes", "Бизнес",
    "Item 1", "Предмет 1",
    "Item 2", "Предмет 2",
    "Item 3", "Предмет 3",
    "Item 4", "Предмет 4",
    "Item 5", "Предмет 5",
    "Item 6", "Предмет 6",
    "Container 1", "Контейнер 1",
    "Container 2", "Контейнер 2",
    "Container 3", "Контейнер 3",
    "Container 4", "Контейнер 4",
    "Container 5", "Контейнер 5",
    "Container 6", "Контейнер 6",
];
function translate(Lang, text) {
    if (Lang != "En") {
        for (let i = 0; i < trans_arr.length - 1; i+=2) {
            if (trans_arr[i] == text) return trans_arr[i+1];
        }
    } else {
        for (let i = 1; i < trans_arr.length; i+=2) {
            if (trans_arr[i] == text) return trans_arr[i-1];
        }
    }
}

const modeBtn = document.getElementById("mode-btn");
const body = document.querySelector("body");

modeBtn.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.remove("light");
        RChange(modeBtn, "light_mode");
    } else {
        body.classList.add("light");
        RChange(modeBtn, "dark_mode");
    }
});

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("dropdown-menu");

menuBtn.addEventListener("click", () => {
    if (menu.style.display == "none") {
        menu.style.display = "block";
        RChange(menuBtn, "expand_more");
    } else {
        menu.style.display = "none";
        RChange(menuBtn, "menu");
    }
});
// var page = document.location.pathname.split("/").slice(-1);