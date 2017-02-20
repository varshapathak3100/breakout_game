// window.onload = function () {
// alert("hey");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 50;
var dx = 2;
var dy = -2;
var ballradius = 5;
var paddleheight = 7;
var paddlewidth = 75;
var paddlex = (canvas.width - paddlewidth) / 2;
var rightpressed = false;
var leftpressed = false;
var brickRowCount = 2;
var brickColumnCount = 5;
var brickWidth = 37;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 20;
var brickOffsetLeft = 30
var score = 0;
var c, r;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightpressed = true;
    } else if (e.keyCode == 37) {
        leftpressed = true;
    }
};

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightpressed = false;
    } else if (e.keyCode == 37) {
        leftpressed = false;
    }
};

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "blue";
                context.fill();
                context.closePath();
            }
        }
    }
};


function drawBall() {
    context.beginPath();
    context.arc(x, y, ballradius, 0, Math.PI * 2);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
};

function drawPaddle() {
    context.beginPath();
    context.rect(paddlex, canvas.height - paddleheight, paddlewidth, paddleheight);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
};

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if ((x > b.x ) && (x < (b.x + brickWidth)) && (y > b.y) && (y < (b.y + brickHeight))) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickColumnCount * brickRowCount) {
                        alert("Congratulations! You Win !");
                        document.location.reload();
                    }
                    // console.log(score);
                }
            }
        }
    }
};

function drawScore() {
    context.font = "14px Arial";
    context.fillStyle = "blue";
    context.fillText("Score :" + score, 10, 15);
};

function draw() {
    // context.fillRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    if (x + dx > canvas.width - ballradius || x + dx < ballradius) {
        dx = -dx;
    }
    if (y + dy < ballradius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballradius) {
        if ((x >= paddlex) && (x <= paddlewidth + paddlex)) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if (rightpressed && paddlex < canvas.width - paddlewidth) {
        paddlex = paddlex + 7;
    }
    if (leftpressed > 0 && paddlex > 0) {
        paddlex = paddlex - 7;
    }

    x = x + dx;
    y = y + dy;

};
    function start() {
        document.getElementById("canvas").style.display = "block";
        setInterval(draw, 10);
    };

// };