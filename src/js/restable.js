/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 12:
/***/ (() => {

eval("var autoSave = true;\r\n\r\ntrans_arr.push(\r\n  \"Auto-save:\", \"Авто-сохранение:\",\r\n  \"Yes\", \"Да\",\r\n  \"No\", \"Нет\",\r\n  \"Table:\", \"Таблица:\",\r\n  \"Name:\", \"Название:\",\r\n  \"Menu\", \"Меню\",\r\n);\r\n\r\nwindow.changeautosave = (bool) => {\r\n  if (bool == \"true\") {\r\n    autoSave = true;\r\n  } else if (bool == \"false\") {\r\n    autoSave = false;\r\n  }\r\n}\r\n\r\nfunction showTable(tbshow) {\r\n    const cont = document.getElementById(\"tb-choose\");\r\n    var tbhide;\r\n    if (tbshow == 1) {\r\n        tbhide = 2;\r\n        cont.firstElementChild.style.color = \"#008000\";\r\n        cont.firstElementChild.style.border = \"1px solid #008000\";\r\n        cont.lastElementChild.style.color = \"#333\";\r\n        cont.lastElementChild.style.border = \"1px solid #7a7e85\";\r\n        window.if1tb = true;\r\n    } else {\r\n        tbhide = 1;\r\n        cont.firstElementChild.style.color = \"#333\";\r\n        cont.firstElementChild.style.border = \"1px solid #7a7e85\";\r\n        cont.lastElementChild.style.color = \"#008000\";\r\n        cont.lastElementChild.style.border = \"1px solid #008000\";\r\n        window.if1tb = false;\r\n    }\r\n    document.getElementById(\"table-\" + tbhide).style.display = 'none';\r\n    document.getElementById(\"table-\" + tbshow).style.display = 'block';\r\n}\r\nfunction enterValues(tbn, tname) {\r\n    var j = 0;\r\n    if (tbn > 1) {j = 72;}\r\n    async function eve() {\r\n        const promises = [];\r\n        for (var i = 0; i < 71; i++) {\r\n            promises.push(getTable(tbn, tname, i));\r\n        }\r\n        const tableValues = await Promise.all(promises);\r\n        for(const [i, val] of tableValues.entries()) {\r\n            if (val !== null) {\r\n                document.getElementById(i + j).value = val;\r\n                document.getElementById(i + j).style.color = \"#008000\";\r\n            } else {\r\n                document.getElementById(i + j).value = \"\";\r\n            }\r\n        }\r\n    }\r\n    eve();\r\n    showTable(tbn);\r\n    return true;\r\n}\r\nfunction sendName(e) {\r\n    const tname = document.getElementById(\"name\").innerHTML;\r\n    if (e.keyCode == \"13\") {\r\n        event.preventDefault();\r\n        if (checkuname() == false) {\r\n            alert(\"Вы не вошли!\");\r\n            return false;\r\n        }\r\n        if (tname !== '') {\r\n            if (typeof(if1tb) != 'undefined') {\r\n                if (window.confirm('Подключиться к проекту \"' + tname + '\" ?\\nЕсли открыт проект он не сохранится!')) {  \r\n                        if (if1tb) {\r\n                            var tbn = 1;\r\n                        } else {\r\n                            var tbn = 2;\r\n                        }\r\n                    enterValues(tbn, tname);\r\n                } else {\r\n                    return false;\r\n                }\r\n            } else {\r\n                alert(\"Выберите тип!\\nХочу или Могу.\")\r\n                return false;\r\n            }\r\n        } else {\r\n            alert(\"Поле не может быть пустым!\");\r\n            return false;\r\n        }\r\n    }\r\n}\r\nfunction sendValues(tbn) {\r\n    if (checklog() == false) {\r\n        alert(\"Вы не имеете права редактирования!\");\r\n        return false;\r\n    }\r\n    const tname = document.getElementById(\"name\").innerHTML;\r\n    if (tname !== '') {\r\n        if (window.confirm('Сохранить изменения?\\nИзмененные значениия будут заменены!')) {\r\n            var j = 0;\r\n            if (tbn > 1) {j = 72;}\r\n            for (var i = 0; i < 71; i++) {\r\n                if (document.getElementById(i + j).value !== '') {\r\n                    writeTable(tbn, tname, i, document.getElementById(i + j).value);\r\n                    document.getElementById(i + j).style.color = \"#008000\";\r\n                }\r\n            }\r\n            return true;\r\n        } else {\r\n            return false;\r\n        }\r\n    } else {\r\n        alert(\"Вы не подсоединены к проекту!\");\r\n        return false;\r\n    }\r\n}\r\nfunction sendValue(tbn, iid) {\r\n    if (checklog() == false) {\r\n        alert(\"Вы не имеете права редактирования!\");\r\n        return false;\r\n    }\r\n    var j = iid;\r\n    if (tbn > 1) j -= 72;\r\n    const checked = document.getElementById(\"check\").checked;\r\n    const tname = document.getElementById(\"name\").innerHTML;\r\n    const ta = document.getElementById(iid);\r\n    if (checked == true && ta.value !== '') {\r\n        if (tname == '') {\r\n            alert(\"Вы не ввели имя проекта!\");\r\n            return false;\r\n        }\r\n        writeTable(tbn, tname, j, ta.value);\r\n        ta.style.color = \"#008000\";\r\n        return true;\r\n    }\r\n    return false;\r\n}\r\nfunction check() {\r\n    const check = document.getElementById(\"check\");\r\n    if (check.checked == true) {\r\n        check.checked = false;\r\n    } else {\r\n        check.checked = true;\r\n    }\r\n}\r\nfunction newTbel(tbn, tname) {\r\n    const newTb = document.getElementById(\"tb-\" + tbn);\r\n    const newEl = document.createElement(\"button\");\r\n    newEl.innerHTML = tname;\r\n    newEl.onclick = function(){openTable(tbn, tname);};\r\n    newEl.setAttribute('type', 'button');\r\n    newTb.firstChild.style.display = \"block\";\r\n    newTb.appendChild(newEl);\r\n}\r\nwindow.newTbel = newTbel;\r\n\r\nfunction rAllChilds(id) {\r\n    const el = document.getElementById(id);\r\n    while (el.childElementCount != 1) el.removeChild(el.lastChild);\r\n}\r\nwindow.rAllChilds = rAllChilds;\r\n\r\nfunction openTable(tbn, tname) {\r\n    enterValues(tbn, tname);\r\n    document.getElementById(\"name\").innerHTML = tname;\r\n}\r\n\r\nvar row, table = 0;\r\nfunction showSrch(id) {\r\n    const srch = document.getElementById(\"srch\");\r\n    const label = document.getElementById(\"kWLabel\");\r\n    const input = document.getElementById(\"kWInput\");\r\n    const text = \"Ключевые слова для поля \";\r\n    if (id.substring(4) <= 71) {\r\n        table = 1;\r\n        row = id.substring(4);\r\n    } else {\r\n        table = 2;\r\n        row = id.substring(4) - 72;\r\n    }\r\n    if (srch.style.display != \"block\") {\r\n        srch.style.display = \"block\";\r\n    } else if (label.innerHTML == text + row) {\r\n        srch.style.display = \"none\";\r\n    }\r\n    if (label.innerHTML != text + row) {\r\n        label.innerHTML = text + row;\r\n        input.value = table + \".\" + row;\r\n    }\r\n}\r\nfunction srchMenu(keys) {\r\n    if (table == 0) return false;\r\n    alert(`${keys}\\n${table}\\n${row}`);\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJO0FBQ3BDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9kdWxlanMvLi9yZXN0YWJsZS5qcz8wODM2Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBhdXRvU2F2ZSA9IHRydWU7XHJcblxyXG50cmFuc19hcnIucHVzaChcclxuICBcIkF1dG8tc2F2ZTpcIiwgXCLQkNCy0YLQvi3RgdC+0YXRgNCw0L3QtdC90LjQtTpcIixcclxuICBcIlllc1wiLCBcItCU0LBcIixcclxuICBcIk5vXCIsIFwi0J3QtdGCXCIsXHJcbiAgXCJUYWJsZTpcIiwgXCLQotCw0LHQu9C40YbQsDpcIixcclxuICBcIk5hbWU6XCIsIFwi0J3QsNC30LLQsNC90LjQtTpcIixcclxuICBcIk1lbnVcIiwgXCLQnNC10L3RjlwiLFxyXG4pO1xyXG5cclxud2luZG93LmNoYW5nZWF1dG9zYXZlID0gKGJvb2wpID0+IHtcclxuICBpZiAoYm9vbCA9PSBcInRydWVcIikge1xyXG4gICAgYXV0b1NhdmUgPSB0cnVlO1xyXG4gIH0gZWxzZSBpZiAoYm9vbCA9PSBcImZhbHNlXCIpIHtcclxuICAgIGF1dG9TYXZlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93VGFibGUodGJzaG93KSB7XHJcbiAgICBjb25zdCBjb250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0Yi1jaG9vc2VcIik7XHJcbiAgICB2YXIgdGJoaWRlO1xyXG4gICAgaWYgKHRic2hvdyA9PSAxKSB7XHJcbiAgICAgICAgdGJoaWRlID0gMjtcclxuICAgICAgICBjb250LmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmNvbG9yID0gXCIjMDA4MDAwXCI7XHJcbiAgICAgICAgY29udC5maXJzdEVsZW1lbnRDaGlsZC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjMDA4MDAwXCI7XHJcbiAgICAgICAgY29udC5sYXN0RWxlbWVudENoaWxkLnN0eWxlLmNvbG9yID0gXCIjMzMzXCI7XHJcbiAgICAgICAgY29udC5sYXN0RWxlbWVudENoaWxkLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICM3YTdlODVcIjtcclxuICAgICAgICB3aW5kb3cuaWYxdGIgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YmhpZGUgPSAxO1xyXG4gICAgICAgIGNvbnQuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuY29sb3IgPSBcIiMzMzNcIjtcclxuICAgICAgICBjb250LmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICM3YTdlODVcIjtcclxuICAgICAgICBjb250Lmxhc3RFbGVtZW50Q2hpbGQuc3R5bGUuY29sb3IgPSBcIiMwMDgwMDBcIjtcclxuICAgICAgICBjb250Lmxhc3RFbGVtZW50Q2hpbGQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgIzAwODAwMFwiO1xyXG4gICAgICAgIHdpbmRvdy5pZjF0YiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJsZS1cIiArIHRiaGlkZSkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFibGUtXCIgKyB0YnNob3cpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59XHJcbmZ1bmN0aW9uIGVudGVyVmFsdWVzKHRibiwgdG5hbWUpIHtcclxuICAgIHZhciBqID0gMDtcclxuICAgIGlmICh0Ym4gPiAxKSB7aiA9IDcyO31cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGV2ZSgpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzE7IGkrKykge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGdldFRhYmxlKHRibiwgdG5hbWUsIGkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGFibGVWYWx1ZXMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtpLCB2YWxdIG9mIHRhYmxlVmFsdWVzLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICBpZiAodmFsICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpICsgaikudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpICsgaikuc3R5bGUuY29sb3IgPSBcIiMwMDgwMDBcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkgKyBqKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBldmUoKTtcclxuICAgIHNob3dUYWJsZSh0Ym4pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZnVuY3Rpb24gc2VuZE5hbWUoZSkge1xyXG4gICAgY29uc3QgdG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVcIikuaW5uZXJIVE1MO1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PSBcIjEzXCIpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChjaGVja3VuYW1lKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINC90LUg0LLQvtGI0LvQuCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRuYW1lICE9PSAnJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mKGlmMXRiKSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKCfQn9C+0LTQutC70Y7Rh9C40YLRjNGB0Y8g0Log0L/RgNC+0LXQutGC0YMgXCInICsgdG5hbWUgKyAnXCIgP1xcbtCV0YHQu9C4INC+0YLQutGA0YvRgiDQv9GA0L7QtdC60YIg0L7QvSDQvdC1INGB0L7RhdGA0LDQvdC40YLRgdGPIScpKSB7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlmMXRiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGJuID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0Ym4gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZW50ZXJWYWx1ZXModGJuLCB0bmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi0JLRi9Cx0LXRgNC40YLQtSDRgtC40L8hXFxu0KXQvtGH0YMg0LjQu9C4INCc0L7Qs9GDLlwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQn9C+0LvQtSDQvdC1INC80L7QttC10YIg0LHRi9GC0Ywg0L/Rg9GB0YLRi9C8IVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzZW5kVmFsdWVzKHRibikge1xyXG4gICAgaWYgKGNoZWNrbG9nKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICBhbGVydChcItCS0Ysg0L3QtSDQuNC80LXQtdGC0LUg0L/RgNCw0LLQsCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPIVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZVwiKS5pbm5lckhUTUw7XHJcbiAgICBpZiAodG5hbWUgIT09ICcnKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKCfQodC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPP1xcbtCY0LfQvNC10L3QtdC90L3Ri9C1INC30L3QsNGH0LXQvdC40LjRjyDQsdGD0LTRg9GCINC30LDQvNC10L3QtdC90YshJykpIHtcclxuICAgICAgICAgICAgdmFyIGogPSAwO1xyXG4gICAgICAgICAgICBpZiAodGJuID4gMSkge2ogPSA3Mjt9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkgKyBqKS52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVRhYmxlKHRibiwgdG5hbWUsIGksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkgKyBqKS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaSArIGopLnN0eWxlLmNvbG9yID0gXCIjMDA4MDAwXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoXCLQktGLINC90LUg0L/QvtC00YHQvtC10LTQuNC90LXQvdGLINC6INC/0YDQvtC10LrRgtGDIVwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2VuZFZhbHVlKHRibiwgaWlkKSB7XHJcbiAgICBpZiAoY2hlY2tsb2coKSA9PSBmYWxzZSkge1xyXG4gICAgICAgIGFsZXJ0KFwi0JLRiyDQvdC1INC40LzQtdC10YLQtSDQv9GA0LDQstCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8hXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBqID0gaWlkO1xyXG4gICAgaWYgKHRibiA+IDEpIGogLT0gNzI7XHJcbiAgICBjb25zdCBjaGVja2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja1wiKS5jaGVja2VkO1xyXG4gICAgY29uc3QgdG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVcIikuaW5uZXJIVE1MO1xyXG4gICAgY29uc3QgdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpaWQpO1xyXG4gICAgaWYgKGNoZWNrZWQgPT0gdHJ1ZSAmJiB0YS52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICBpZiAodG5hbWUgPT0gJycpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLQktGLINC90LUg0LLQstC10LvQuCDQuNC80Y8g0L/RgNC+0LXQutGC0LAhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdyaXRlVGFibGUodGJuLCB0bmFtZSwgaiwgdGEudmFsdWUpO1xyXG4gICAgICAgIHRhLnN0eWxlLmNvbG9yID0gXCIjMDA4MDAwXCI7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gY2hlY2soKSB7XHJcbiAgICBjb25zdCBjaGVjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hlY2tcIik7XHJcbiAgICBpZiAoY2hlY2suY2hlY2tlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgY2hlY2suY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjaGVjay5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBuZXdUYmVsKHRibiwgdG5hbWUpIHtcclxuICAgIGNvbnN0IG5ld1RiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0Yi1cIiArIHRibik7XHJcbiAgICBjb25zdCBuZXdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBuZXdFbC5pbm5lckhUTUwgPSB0bmFtZTtcclxuICAgIG5ld0VsLm9uY2xpY2sgPSBmdW5jdGlvbigpe29wZW5UYWJsZSh0Ym4sIHRuYW1lKTt9O1xyXG4gICAgbmV3RWwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgbmV3VGIuZmlyc3RDaGlsZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgbmV3VGIuYXBwZW5kQ2hpbGQobmV3RWwpO1xyXG59XHJcbndpbmRvdy5uZXdUYmVsID0gbmV3VGJlbDtcclxuXHJcbmZ1bmN0aW9uIHJBbGxDaGlsZHMoaWQpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgd2hpbGUgKGVsLmNoaWxkRWxlbWVudENvdW50ICE9IDEpIGVsLnJlbW92ZUNoaWxkKGVsLmxhc3RDaGlsZCk7XHJcbn1cclxud2luZG93LnJBbGxDaGlsZHMgPSByQWxsQ2hpbGRzO1xyXG5cclxuZnVuY3Rpb24gb3BlblRhYmxlKHRibiwgdG5hbWUpIHtcclxuICAgIGVudGVyVmFsdWVzKHRibiwgdG5hbWUpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lXCIpLmlubmVySFRNTCA9IHRuYW1lO1xyXG59XHJcblxyXG52YXIgcm93LCB0YWJsZSA9IDA7XHJcbmZ1bmN0aW9uIHNob3dTcmNoKGlkKSB7XHJcbiAgICBjb25zdCBzcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcmNoXCIpO1xyXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImtXTGFiZWxcIik7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia1dJbnB1dFwiKTtcclxuICAgIGNvbnN0IHRleHQgPSBcItCa0LvRjtGH0LXQstGL0LUg0YHQu9C+0LLQsCDQtNC70Y8g0L/QvtC70Y8gXCI7XHJcbiAgICBpZiAoaWQuc3Vic3RyaW5nKDQpIDw9IDcxKSB7XHJcbiAgICAgICAgdGFibGUgPSAxO1xyXG4gICAgICAgIHJvdyA9IGlkLnN1YnN0cmluZyg0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFibGUgPSAyO1xyXG4gICAgICAgIHJvdyA9IGlkLnN1YnN0cmluZyg0KSAtIDcyO1xyXG4gICAgfVxyXG4gICAgaWYgKHNyY2guc3R5bGUuZGlzcGxheSAhPSBcImJsb2NrXCIpIHtcclxuICAgICAgICBzcmNoLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9IGVsc2UgaWYgKGxhYmVsLmlubmVySFRNTCA9PSB0ZXh0ICsgcm93KSB7XHJcbiAgICAgICAgc3JjaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobGFiZWwuaW5uZXJIVE1MICE9IHRleHQgKyByb3cpIHtcclxuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSB0ZXh0ICsgcm93O1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGFibGUgKyBcIi5cIiArIHJvdztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzcmNoTWVudShrZXlzKSB7XHJcbiAgICBpZiAodGFibGUgPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgYWxlcnQoYCR7a2V5c31cXG4ke3RhYmxlfVxcbiR7cm93fWApO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///12\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[12]();
/******/ 	
/******/ })()
;