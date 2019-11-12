const col = document.querySelector(".col");
const row = document.querySelector(".row");
const btnCreat = document.querySelector(".creat");
var tableArea = document.querySelector(".table");
var header;
var table;
var colValue;
var rowValue;
var sort = false

const creatTable = () => {
    tableArea.innerHTML = "";
    colValue = parseInt(col.value);
    rowValue = parseInt(row.value);
    let tagCol;
    let text;
    let tagRow;

    table = document.createElement("table");
    for (var i = 0; i < rowValue + 1; i++) {
        tagRow = document.createElement("tr");
        table.appendChild(tagRow);
        if (i === 0) {
            for (var j = 0; j < colValue + 1; j++) {
                if (j === 0) {
                    tagCol = document.createElement("td");
                    text = document.createTextNode("stt");
                    tagCol.appendChild(text);
                    tagRow.appendChild(tagCol);
                } else {
                    tagCol = document.createElement("td");
                    text = document.createTextNode("");
                    tagCol.appendChild(text);
                    tagRow.appendChild(tagCol);
                }
            }
        } else {
            for (var j = 0; j < colValue + 1; j++) {
                if (j === 0) {
                    tagCol = document.createElement("td");
                    text = document.createTextNode(i);
                    tagCol.appendChild(text);
                    tagRow.appendChild(tagCol);
                } else {
                    tagCol = document.createElement("td");
                    text = document.createTextNode(Math.floor(Math.random() * 1000));
                    tagCol.appendChild(text);
                    tagRow.appendChild(tagCol);
                }
            }
        }
    }
    tableArea.appendChild(table);

    header = document.querySelectorAll("td");
    header.forEach((header, index) =>
        header.addEventListener("click", () => {
            if (index > 0 && index <= colValue) {
                sortFunction(index);
            }
        })
    );
};
const sortFunction = (index) => {
    let sortting = true;
    while (sortting) {
        sortting = false;
        rows = table.rows;
        for (i = 1; i < rowValue; i++) {
            eswitch = false;
            firstElement = rows[i].cells[index];
            lastElement = rows[i + 1].cells[index];
            if (sort) {
                if (Number(firstElement.innerHTML) > Number(lastElement.innerHTML)) {

                    eswitch = true;
                    break;
                }
            }
            else {
                if (Number(firstElement.innerHTML) < Number(lastElement.innerHTML)) {
                    eswitch = true;
                    break;
                }
            }
        }
        if (eswitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sortting = true;
        }
    }
    sort = !sort
}

const scroll = (e) => {
    const slideInAt = window.scrollY + window.innerHeight
    console.log(slideInAt)
    if (slideInAt > 2738) {

    }
}

console.log(rowValue)
btnCreat.addEventListener("click", creatTable);
window.addEventListener("scroll", scroll)