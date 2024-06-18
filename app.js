const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('score');

const box = 20; // Tamanho de cada quadrado da cobrinha e da comida
const canvasSize = 20; // Tamanho do canvas (20x20 quadrados)

canvas.width = box * canvasSize;
canvas.height = box * canvasSize;

let snake;
let food;
let score;
let d;
let game;

function init() {
  snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };

  food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
  };

  score = 0;
  d = null;

  if (game) clearInterval(game);
  game = setInterval(draw, 100);

  updateScore();
}

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if (key == 38 && d != 'DOWN') {
    d = 'UP';
  } else if (key == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if (key == 40 && d != 'UP') {
    d = 'DOWN';
  }
}

function collision(newHead, array) {
  for (let i = 0; i < array.length; i++) {
    if (newHead.x == array[i].x && newHead.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function updateScore() {
  scoreDisplay.textContent = 'Pontuação: ' + score;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * canvasSize) * box,
      y: Math.floor(Math.random() * canvasSize) * box
    };
    updateScore();
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (snakeX < 0 || snakeY < 0 || snakeX > canvas.width || snakeY > canvas.height || collision(newHead, snake)) {
    clearInterval(game);
    alert('Fim do Jogo');
  }

  snake.unshift(newHead);
}

resetButton.addEventListener('click', init);
document.addEventListener('keydown', direction);

init();
