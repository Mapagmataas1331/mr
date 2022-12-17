function sendName(e) {
    const tname = document.getElementById("name").innerHTML;
    if (e.keyCode == "13") {
        event.preventDefault();
        if (tname !== '') {
            if (window.confirm('Подключиться к проекту "' + tname + '" ?\nЕсли открыт проект он не сохранится!')) {
                async function enterValues() {
                    const promises = [];
                    for (let i = 0; i < 69; i++) {
                        promises.push(getTable(tname, i));
                    }
                    const tableValues = await Promise.all(promises);
                    for(const [i, val] of tableValues.entries()) {
                        document.getElementById(i).value = val;
                    }
                }
                enterValues();
            } else {
                return false;
            }
        } else {
            alert("Поле не может быть пустым!");
            return false;
        }
    }
}
function sendValues() {
    const tname = document.getElementById("name").innerHTML;
    if (tname !== '') {
        if (window.confirm('Сохранить изменения?\nИзмененные значениия будут заменены!')) {
            for (i = 0; i < 69; i++) {
                if (document.getElementById(i).value !== '') {
                    writeTable(tname, i, document.getElementById(i).value);
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