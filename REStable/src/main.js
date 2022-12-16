function sendName(e) {
    if (e.keyCode == "13") {
        event.preventDefault();
        if (document.getElementById("name").innerHTML !== '') {
            if (window.confirm('Подключиться к проекту "' + document.getElementById("name").innerHTML + '" ?\nЕсли открыт проект он не сохранится!')) {
                for (i = 0; i < 69; i++) {
                    document.getElementById(i).value = i;
                } 
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
    if (document.getElementById("name").innerHTML !== '') {
        if (window.confirm('Сохранить изменения?\nИзмененные значениия будут заменены!')) {
            for (i = 0; i < 69; i++) {
                if (document.getElementById(i).value !== '') {
                    document.getElementById(i).value += ' (Sent!)';
                }
            }
            setTimeout(() => {
                for (i = 0; i < 69; i++) {
                    document.getElementById(i).value = i;
                } 
            }, 3000);
            return true;
        } else {
            return false;
        }
    } else {
        alert("Вы не подсоединены к проекту!");
        return false;
    }
}