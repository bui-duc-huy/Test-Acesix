const reset = document.querySelector(".reset");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const row = document.querySelector(".row")
const win = document.querySelector(".win")
const btnStart = document.querySelector(".start")
const winner = document.querySelector(".winner");

let playerX = true;
let box = 50;
let numberWin = 3;
let endGame = false;
let gameBroad = [[]];

let numberOfRow = 3

gameBroad = new Array(numberOfRow)
for (let i = 0; i < numberOfRow; i++) {
    gameBroad[i] = new Array(numberOfRow)
}

canvas.width = box * numberOfRow;
canvas.height = box * numberOfRow;



const draw = () => {
    ctx.beginPath();
    for (let index = 1; index <= numberOfRow; index++) {
        ctx.moveTo(0, box * index);
        ctx.lineTo(canvas.width, box * index);
        ctx.stroke();

        ctx.moveTo(box * index, 0);
        ctx.lineTo(box * index, canvas.width);
        ctx.stroke();
    }
    for (let i = 0; i < numberOfRow; i++) {
        for (let j = 0; j < numberOfRow; j++) {
            if (gameBroad[j][i] === "o") {
                ctx.beginPath();
                ctx.arc(
                    box / 2 + box * i,
                    box / 2 + box * j,
                    box / 2 - 10,
                    0,
                    Math.PI * 2
                );
                ctx.stroke();
            }
            if (gameBroad[j][i] === "x") {
                ctx.beginPath();
                ctx.moveTo(box / 5 + i * box, j * box + box - box / 5);
                ctx.lineTo(box - box / 5 + i * box, j * box + box / 5);
                ctx.stroke();

                ctx.moveTo(box - box / 5 + i * box, j * box + box - box / 5);
                ctx.lineTo(box / 5 + i * box, j * box + box / 5);
                ctx.stroke();
            }
        }
    }
};

const checkRow = (x, y, player) => {
    let count = 0
    for (let index = 0; index < numberOfRow; index++) {
        if (gameBroad[index][y] === player) {
            count++
        }
        if (count === numberWin) {
            console.log("row")
            return true
        }
        if (gameBroad[index][y] !== player) {
            count = 0
        };
    }
    return false;
};
const checkCol = (x, y, player) => {
    let count = 0
    for (let index = 0; index < numberOfRow; index++) {
        if (gameBroad[x][index] === player) {
            count++
        }
        if (count === numberWin) {
            console.log("col")
            return true
        }
        if (gameBroad[x][index] !== player) {
            count = 0
        };
    }
    return false;
};
const checkBias = (x, y, player) => {
    let count = 0
    for (let j = 0; j < numberOfRow; j++) {
        if (count === numberWin) {
            console.log("bias")
            return true
        }
        if (gameBroad[j][j] === player) {
            count++
        }
        if (gameBroad[j][j] !== player) {
            count = 0
        }
    }
    count = 0
    for (let i = 0; i < 2 * numberOfRow - 1; i++) {
        for (let j = 0; j < numberOfRow; j++) {
            if (count === numberWin) {
                console.log("bias")
                return true
            }
            if (j + i >= numberOfRow) {
                continue
            }
            if (gameBroad[j][i + j] === player) {
                count++
            }
            if (gameBroad[j][i + j] !== player) {
                count = 0
            }
        }
    }
    count = 0
    for (let i = 0; i < 2 * numberOfRow - 1; i++) {
        for (let j = 0; j < numberOfRow; j++) {
            if (count === numberWin) {
                console.log("bias")
                return true
            }
            if (j + i >= numberOfRow) {
                continue
            }
            if (gameBroad[j + i][j] === player) {
                count++
            }
            if (gameBroad[j + i][j] != player) {
                count = 0
            }
        }
    }
};
const checkOpposite = (x, y, player) => {
    let count = 0
    for (let i = 0; i < numberOfRow; i++) {
        if (numberOfRow - i < 0) {
            break
        }
        if (count === numberWin) {
            console.log("opposite1")
            return true
        }
        if (gameBroad[numberOfRow - i - 1][i] === player) {
            count++
        }
        if (gameBroad[numberOfRow - i - 1][i] !== player) {
            count = 0
        }
    }
    count = 0
    for (let i = 0; i < numberOfRow; i++) {
        for (let j = 0; j < numberOfRow; j++) {
            if (numberOfRow - j - 1 < 0) {
                continue
            }
            if (i + j >= numberOfRow) {
                continue
            }
            if (gameBroad[numberOfRow - j - 1][j + i] === player) {
                count++
            }
            if (count === numberWin) {
                console.log("opposite2")
                return true
            }
            if (gameBroad[numberOfRow - j - 1][j + i] !== player) {
                count = 0
            }

        }
    }
    count = 0
    for (let i = 0; i < numberOfRow; i++) {
        for (let j = 0; j < numberOfRow; j++) {
            if (numberOfRow - j - 1 - i < 0) {
                continue
            }
            if (i + j >= numberOfRow) {
                continue
            }
            if (gameBroad[numberOfRow - j - 1 - i][j] === player) {
                count++
            }
            if (count === numberWin) {
                console.log("opposite3")
                return true
            }
            if (gameBroad[numberOfRow - j - 1 - i][j] !== player) {
                count = 0
            }

        }
    }
    return false
};

const checkWinner = (x, y) => {
    console.log(x, y)
    let result = {
        player: "",
        win: false
    };
    if (gameBroad[x][y] === "x") {
        result.player = "X";
        if (
            checkBias(x, y, "x") ||
            checkOpposite(x, y, "x") ||
            checkCol(x, y, "x") ||
            checkRow(x, y, "x")
        ) {
            console.log("x win");
            winner.innerHTML = "Player " + result.player + " win";
            endGame = true;
            return;
        }
    }
    if (gameBroad[x][y] === "o") {
        result.player = "O";
        if (
            checkBias(x, y, "o") ||
            checkOpposite(x, y, "o") ||
            checkCol(x, y, "o") ||
            checkRow(x, y, "o")
        ) {
            console.log("o win");
            winner.innerHTML = "Player " + result.player + " win";
            endGame = true;
            return;
        }
    }
};

const play = e => {
    if (endGame) {
        return;
    }
    let x = Math.floor(e.offsetY / box);
    let y = Math.floor(e.offsetX / box);
    if (gameBroad[x][y] === "x" || gameBroad[x][y] === "o") {
        return;
    }
    gameBroad[x][y] = playerX ? "x" : "o";
    playerX = !playerX;
    draw();
    checkWinner(x, y);
};

const resetFunction = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    winner.innerHTML = "";
    gameBroad = new Array(numberOfRow)
    for (let i = 0; i < numberOfRow; i++) {
        gameBroad[i] = new Array(numberOfRow)
    }
    draw();
    playerX = true
    endGame = false;
}

const start = () => {
    winner.innerHTML = ""
    numberOfRow = parseInt(row.value)
    numberWin = parseInt(win.value)
    canvas.width = box * numberOfRow;
    canvas.height = box * numberOfRow;
    gameBroad = new Array(numberOfRow)
    for (let i = 0; i < numberOfRow; i++) {
        gameBroad[i] = new Array(numberOfRow)
    }
    draw()
    playerX = true
    endGame = false
}
draw()

reset.addEventListener("click", resetFunction);
canvas.addEventListener("click", play);
btnStart.addEventListener("click", start)