const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const mode1 = document.querySelector(".mode1");
const mode2 = document.querySelector(".mode2");
const gameOver = document.querySelector(".gameOver");
const box = 20;
let modeGame = 1;
let game;
canvas.width = 20 * box;
canvas.height = 20 * box;
let snake = [];
let snakeLength = 1;
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let d;

const draw = () => {
    for (let index = 0; index < snakeLength; index++) {
        ctx.fillStyle = "red";
        ctx.fillRect(snake[index].x, snake[index].y, box, box);
    }
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x, food.y, box, box);
    if (d) snakeMove();
    snakeGoToWall();
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snakeEatFood();
    } else {
        checkGameOver();
    }
}
const snakeGoToWall = () => {
    if (snake[0].x < 0) {
        snake[0].x = 19 * box;
        ctx.fillStyle = "white";
        ctx.fillRect(0, snake[0].y, box, box);
    }
    if (snake[0].x > 19 * box) {
        snake[0].x = 0;
        ctx.fillStyle = "white";
        ctx.fillRect(0, snake[0].y, box, box);
    }
    if (snake[0].y < 0) {
        snake[0].y = 19 * box;
        ctx.fillStyle = "white";
        ctx.fillRect(snake[0].x, 0, box, box);
    }
    if (snake[0].y > 19 * box) {
        snake[0].y = 0;
        ctx.fillStyle = "white";
        ctx.fillRect(snake[0].x, 0, box, box);
    }
}
const snakeMove = () => {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let preTailx = snake[snakeLength - 1].x;
    let preTaily = snake[snakeLength - 1].y;
    if (d === "UP") snakeY -= box;
    if (d === "DOWN") snakeY += box;
    if (d === "RIGHT") snakeX += box;
    if (d === "LEFT") snakeX -= box;
    snake.pop();
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);
    snake.slice(snakeLength, snake.length - 1);
    for (let index = 0; index < snakeLength; index++) {
        ctx.fillStyle = "red";
        ctx.fillRect(snake[index].x, snake[index].y, box, box);
    }
    ctx.fillStyle = "white";
    ctx.fillRect(preTailx, preTaily, box, box);
    // ctx.clearReact(preTailx, preTaily, box, box);
}
const snakeEatFood = () => {
    snakeLength++;
    let newTail = {
        x: food.x,
        y: food.y
    };
    snake.push(newTail);
    ctx.fillStyle = "white";
    ctx.fillRect(food.x, food.y, box, box);
    food.x = Math.floor(Math.random() * 17 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 3) * box;
}
const checkGameOver = () => {
    if (modeGame === 2) {
        if (
            snake[0].x === 0 ||
            snake[0].y === 0 ||
            snake[0].x === 19 * box ||
            snake[0].y === 19 * box
        ) {
            d = "";
            clearInterval(game);
            gameOver.innerHTML = "Game Over";
        }
    }
    for (let index = 2; index < snakeLength; index++) {
        if (snake[0].x === snake[index].x && snake[0].y === snake[index].y) {
            d = "";
            clearInterval(game);
            gameOver.innerHTML = "Game Over";
        }
    }
}
const direction = (e) => {
    if (e.keyCode === 37 && d !== "RIGHT") d = "LEFT";
    else if (e.keyCode === 38 && d !== "DOWN") d = "UP";
    else if (e.keyCode === 40 && d !== "UP") d = "DOWN";
    else if (e.keyCode === 39 && d !== "LEFT") d = "RIGHT";
}
const startGame = () => {
    gameOver.innerHTML = "";
    clearInterval(game);
    modeGame = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake[0] = {
        x: 10 * box,
        y: 10 * box
    };
    snakeLength = 1;
    d = "RIGHT";
    game = setInterval(draw, 100);
}
startGame();

window.addEventListener("keydown", direction);
mode1.addEventListener("click", () => {
    startGame();
    modeGame = 1;
});
mode2.addEventListener("click", () => {
    startGame();
    modeGame = 2;
});
