function logregmenu() {
    const logregmenu = document.getElementById("logreg");
    if (logregmenu.style.display != "block") {
        logregmenu.style.display = "block";
    } else {
        logregmenu.style.display = "none";
    }
}
function showTable(tbshow) {
    const cont = document.getElementById("tb-choose");
    var tbhide;
    if (tbshow == 1) {
        tbhide = 2;
        cont.firstElementChild.style.color = "#008000";
        cont.firstElementChild.style.border = "1px solid #008000";
        cont.lastElementChild.style.color = "#333";
        cont.lastElementChild.style.border = "1px solid #7a7e85";
        window.if1tb = true;
    } else {
        tbhide = 1;
        cont.firstElementChild.style.color = "#333";
        cont.firstElementChild.style.border = "1px solid #7a7e85";
        cont.lastElementChild.style.color = "#008000";
        cont.lastElementChild.style.border = "1px solid #008000";
        window.if1tb = false;
    }
    document.getElementById("table-" + tbhide).style.display = 'none';
    document.getElementById("table-" + tbshow).style.display = 'block';
}
function enterValues(tbn, tname) {
    var j = 0;
    if (tbn > 1) {j = 72;}
    async function eve() {
        const promises = [];
        for (var i = 0; i < 71; i++) {
            promises.push(getTable(tbn, tname, i));
        }
        const tableValues = await Promise.all(promises);
        for(const [i, val] of tableValues.entries()) {
            if (val !== null) {
                document.getElementById(i + j).value = val;
                document.getElementById(i + j).style.color = "#008000";
            } else {
                document.getElementById(i + j).value = "";
            }
        }
    }
    eve();
    showTable(tbn);
    return true;
}
function sendName(e) {
    const tname = document.getElementById("name").innerHTML;
    if (e.keyCode == "13") {
        event.preventDefault();
        if (checkuname() == false) {
            alert("Вы не вошли!");
            return false;
        }
        if (tname !== '') {
            if (typeof(if1tb) != 'undefined') {
                if (window.confirm('Подключиться к проекту "' + tname + '" ?\nЕсли открыт проект он не сохранится!')) {  
                        if (if1tb) {
                            var tbn = 1;
                        } else {
                            var tbn = 2;
                        }
                    enterValues(tbn, tname);
                } else {
                    return false;
                }
            } else {
                alert("Выберите тип!\nХочу или Могу.")
                return false;
            }
        } else {
            alert("Поле не может быть пустым!");
            return false;
        }
    }
}
function sendValues(tbn) {
    if (checklog() == false) {
        alert("Вы не имеете права редактирования!");
        return false;
    }
    const tname = document.getElementById("name").innerHTML;
    if (tname !== '') {
        if (window.confirm('Сохранить изменения?\nИзмененные значениия будут заменены!')) {
            var j = 0;
            if (tbn > 1) {j = 72;}
            for (var i = 0; i < 71; i++) {
                if (document.getElementById(i + j).value !== '') {
                    writeTable(tbn, tname, i, document.getElementById(i + j).value);
                    document.getElementById(i + j).style.color = "#008000";
                }
            }
            return true;
        } else {
            return false;
        }
    } else {
        alert("Вы не подсоединены к проекту!");
        return false;
    }
}
function sendValue(tbn, iid) {
    if (checklog() == false) {
        alert("Вы не имеете права редактирования!");
        return false;
    }
    var j = iid;
    if (tbn > 1) j -= 72;
    const checked = document.getElementById("check").checked;
    const tname = document.getElementById("name").innerHTML;
    const ta = document.getElementById(iid);
    if (checked == true && ta.value !== '') {
        if (tname == '') {
            alert("Вы не ввели имя проекта!");
            return false;
        }
        writeTable(tbn, tname, j, ta.value);
        ta.style.color = "#008000";
        return true;
    }
    return false;
}
function check() {
    const check = document.getElementById("check");
    if (check.checked == true) {
        check.checked = false;
    } else {
        check.checked = true;
    }
}
function newTbel(tbn, tname) {
    const newTb = document.getElementById("tb-" + tbn);
    const newEl = document.createElement("button");
    newEl.innerHTML = tname;
    newEl.onclick = function(){openTable(tbn, tname);};
    newEl.setAttribute('type', 'button');
    newTb.firstChild.style.display = "block";
    newTb.appendChild(newEl);
}
window.newTbel = newTbel;

function rAllChilds(id) {
    const el = document.getElementById(id);
    while (el.childElementCount != 1) el.removeChild(el.lastChild);
}
window.rAllChilds = rAllChilds;

function openTable(tbn, tname) {
    enterValues(tbn, tname);
    document.getElementById("name").innerHTML = tname;
}

function showSrch(id) {
    const srch = document.getElementById("srch");
    const label = document.getElementById("kWLabel");
    const input = document.getElementById("kWInput");
    const text = "Ключевые слова для поля ";
    var table, row;
    if (id.substring(4) <= 71) {
        table = 1;
        row = id.substring(4);
    } else {
        table = 2;
        row = id.substring(4) - 72;
    }
    if (srch.style.display != "block") {
        srch.style.display = "block";
    } else if (label.innerHTML == text + row) {
        srch.style.display = "none";
    }
    if (label.innerHTML != text + row) {
        label.innerHTML = text + row;
        input.value = table + "." + row;
    }
}