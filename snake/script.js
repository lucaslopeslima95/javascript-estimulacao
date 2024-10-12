const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
var interval;

canvas.width = 800;
canvas.height = 800;

const gridSize = 20;


let snake = [{ x: 200, y: 200 }];
let direction = { x: gridSize, y: 0 };


let food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
};

let score = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}


function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}


function moveSnake() {
    
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    
    snake.unshift(newHead);

    
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        let ptsPanel = document.getElementById('pts');
        let points = Number(ptsPanel.innerText);
        ptsPanel.innerHTML = (points+1);
        
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    } else {
        
        snake.pop();
    }
}

function checkCollision() {

    if (
        snake[0].x < 0 || snake[0].x >= canvas.width ||
        snake[0].y < 0 || snake[0].y >= canvas.height
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    
    if (checkCollision()) {
        window.location.href = '../meAcerte.html';
        return;
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
    }
}

window.addEventListener('keydown', event => {
    const key = event.key;

    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});


function comecarJogo(){
    
    let velSelected1 = document.getElementById('vl1').checked;
    let velSelected2 = document.getElementById('vl2').checked;
    let velSelected3 = document.getElementById('vl3').checked;

    if(velSelected1 && velSelected2 && velSelected3){
        alert('Por favor selecione uma velocidade!!')
        window.location.reload();
    }
    
    let interval = 300;
    
    if(velSelected1){
        interval = 300;
    }else if(velSelected1){
        interval = 200;
    }else{
        interval = 100;
    }
    myModal.hide();
    
    setInterval(function(){gameLoop()}, interval);
}



