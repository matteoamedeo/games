//Create variables to reference and store canvas 
let canvas = document.getElementById('mycanvas');
const body = document.querySelector('body');
const restart = document.querySelector('.instruction')
/* SET WIDTH TO BODY */
body.style.width = '100vw';

let controllers = Array.from(document.querySelectorAll('.controllers'));
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let speedBall = 1.3;
let speedPaddles = 4;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = speedBall;
let dy = -speedBall;

//create the paddle
let paddleHeight = 12;
let paddleWidth = 72;

//specify starting point of paddle
let paddleX = (canvas.width - paddleWidth) / 2;

//holding variables for right and left arrows on keyboard
let rightPressed = false;
let leftPressed = false;

//holding variables for bricks
let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;
//Create variables to take score
let score = 0;

//Creating arrays for the bricks
let bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        //set the x and y position of the bricks
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);
controllers.forEach(controller => {
    controller.addEventListener("mousedown", controllersDownHandler, false);
    controller.addEventListener("mouseup", controllersUpHandler, false);
});

//Anchor paddle movement to mouse movement
function mouseMoveHandler(e) {
    console.log('mouse hand');
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function controllersDownHandler(e) {
    if (e.target.classList.contains('right')) {

        rightPressed = true;
        console.log(rightPressed);
    } else if (e.target.classList.contains('left')) {
        leftPressed = true;
        console.log(leftPressed);
    }
}
function controllersUpHandler(e) {
    if (e.target.classList.contains('right')) {
        setTimeout(() => {
            rightPressed = false;
            console.log(rightPressed);
        }, 100)

    } else if (e.target.classList.contains('left')) {
        setTimeout(() => {
            leftPressed = false;
        }, 100)

    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
        console.log(rightPressed);
    }
    else if (e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
        console.log(rightPressed);

    }
    else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    // ctx.ellipse(100, 100, 14, 10, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'lawngreen';
    ctx.fill();

    ctx.closePath();
}
//Create a function to create the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    ctx.fillStyle = 'lawngreen';
    ctx.fill();
    ctx.closePath();
}
//Create a function to draw the bricks
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#6600cc';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//Create function to keep track of score
function drawScore() {
    ctx.font = '14px BDCartoonShoutRegular';
    ctx.fillStyle = 'white';
    ctx.fillText('score: ' + score, 8, 20); //position score at 8,20 on the x,y axis of the canvas
}

//Collision dections for the bricks
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert('Congratulations!! You\'ve won!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw() {
    //clear each instance of the canvas so a new circle can be drawn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    //Calculate collision detections
    //left and right walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //top walls
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        //detect paddle hits
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        //if no paddle hit, body of canvas is hit ==> game over
        else {
            // alert('GAME OVER!!');
            document.location.reload();
        }
    }

    //bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    //Make paddle move
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += speedPaddles;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= speedPaddles;
    }
    //Making the ball move
    x += dx; //update x movement every frame
    y += dy; //update y movement every frame
}

/* RESIZE CANVAS */
window.addEventListener("resize", function () {
    sizePage();
})
function sizePage() {
    /* MAKE RESPONSIVE */
    let canvasWidth = body.getBoundingClientRect().width;
    let cnavasHeight = window.innerHeight;
    if (canvasWidth <= 425) {
        canvas.width = canvasWidth;
        brickColumnCount = 4;
        brickWidth = 80;
        brickHeight = 20;
        paddleWidth = 65;
    }
    if (canvasWidth <= 375) {
        canvas.width = canvasWidth;
        brickColumnCount = 4;
        brickWidth = 69;
        brickHeight = 17;
        paddleWidth = 60;
    }
    if (canvasWidth <= 320) {
        canvas.width = canvasWidth;
        brickColumnCount = 4;
        brickWidth = 56;
        brickHeight = 15;
        x = canvas.width / 4;
        paddleWidth = 55;
        paddleX = (canvas.width - paddleWidth) / 4;
    }
}
sizePage();

/* RESTART GAME */
restart.addEventListener('click', () => { location.reload() })

setInterval(draw, 1)
