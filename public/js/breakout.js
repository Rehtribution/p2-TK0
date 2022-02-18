var canvas = document.getElementById("canvas1");
var cgc = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPress = false;
var leftPress = false;
var brickRowCount = 6;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;
var score = 0;
var lives = 3;
var stopBall = false;

var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (
		relativeX > 0 + paddleWidth / 2 &&
		relativeX < canvas.width - paddleWidth / 2
	) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

function drawBricks() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = c * (brickWidth + brickPadding) + brickOffSetLeft;
				var brickY = r * (brickHeight + brickPadding) + brickOffSetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;

				cgc.beginPath();
				cgc.rect(brickX, brickY, brickWidth, brickHeight);
				cgc.fillStyle = "#00095DD";
				cgc.fill();
				cgc.strokeStyle = "rgba(0,0,255,0.5)";
				cgc.stroke();
				cgc.closePath();
			}
		}
	}
}

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPress = true;
	} else if (e.keyCode == 37) {
		leftPress = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPress = false;
	} else if (e.keyCode == 37) {
		leftPress = false;
	}
}

function drawBall() {
	cgc.beginPath();
	cgc.arc(x, y, ballRadius, 0, Math.PI * 2);
	cgc.fillStyle = "#0095DD";
	cgc.fill();
	cgc.closePath();
}

function drawPaddle() {
	cgc.beginPath();
	cgc.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	cgc.fillStyle = "#0095DD";
	cgc.fill();
	cgc.closePath();
}

function collisonDetection() {
	for (var c = 0; c < brickColumnCount; c++) {
		for (var r = 0; r < brickRowCount; r++) {
			if (stopBall) {
				break;
			}
			var b = bricks[c][r];
			if (b.status == 1) {
				if (
					x > b.x &&
					x < b.x + brickWidth &&
					y > b.y &&
					y < b.y + brickHeight
				) {
					dy = -dy;
					b.status = 0;
					++score;
					if (brickColumnCount * brickRowCount == score) {
						alert("YOU WIN!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	cgc.font = "16px Arial";
	cgc.fillStyle = "#0095DD";
	cgc.fillText("Score:" + score, 8, 20);
}

function drawLives() {
	cgc.font = "16px Arial";
	cgc.fillStyle = "#0095DD";
	cgc.fillText("Lives:" + lives, canvas.width - 65, 20);
}

function draw() {
	cgc.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();

	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - 2 * ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives = lives - 1;
			if (!lives) {
				// alert("GAME OVER!");
				stopBall = true;
				ballRadius = 0;
				lives = 4;
				$("#breakout-modal2").modal("show");
				// document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
	if (rightPress && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPress && paddleX > 0) {
		paddleX -= 7;
	}
	x += dx;
	y += dy;
}

setInterval(draw, 10);

var saveScores = function () {
	localStorage.setItem("highscores", score);
};

var closeModal = document.querySelector(".close-button");
closeModal.addEventListener("click", function (e) {
	$("#breakout-modal2").modal("hide");
	draw();
	document.location.reload();
});
