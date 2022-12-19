function logregmenu() {
    const logregmenu = document.getElementById("logreg");
    if (logregmenu.style.display != "block") {
        logregmenu.style.display = "block";
    } else {
        logregmenu.style.display = "none";
    }
}
function enterValues(tbn, tname) {
    const tbq = 69;
    if (tbn !== 1) {tbq = 69;}
    async function eve() {
        const promises = [];
        for (let i = 0; i < tbq; i++) {
            promises.push(getTable(tbn, tname, i));
        }
        const tableValues = await Promise.all(promises);
        for(const [i, val] of tableValues.entries()) {
            if (val !== null) {
            document.getElementById(i).value = val;
            document.getElementById(i).style.color = "#008000";
            }
        }
    }
    eve();
    return true;
}
function sendName(e, tbn) {
    const tname = document.getElementById("name").innerHTML;
    if (e.keyCode == "13") {
        event.preventDefault();
        if (tname !== '') {
            if (window.confirm('Подключиться к проекту "' + tname + '" ?\nЕсли открыт проект он не сохранится!')) {
                enterValues(tbn, tname)
            } else {
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
    const tbq = 69;
    if (tname !== '') {
        if (window.confirm('Сохранить изменения?\nИзмененные значениия будут заменены!')) {
            if (tbn !== 1) {tbq = 69;}
            for (i = 0; i < tbq; i++) {
                if (document.getElementById(i).value !== '') {
                    writeTable(tbn, tname, i, document.getElementById(i).value);
                    document.getElementById(i).style.color = "#008000";
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
    const checked = document.getElementById("check").checked;
    const tname = document.getElementById("name").innerHTML;
    const ta = document.getElementById(iid);
    if (checked == true && tname !== '' && ta.value !== '') {
        writeTable(tbn, tname, iid, ta.value);
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