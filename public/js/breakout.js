window.onload = function () {
	paused = false;
	playBtn.disabled = false;
};

const playBtn = document.getElementById("play-btn");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const canvas = document.getElementById("canvas");
const cgc = canvas.getContext("2d");

let score = 0;
let highScore = localStorage.getItem("score");
let paused = false;

const brickRowCount = 5;
const brickColumnCount = 9;

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
};

const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
};

const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickRowCount; j++) {
		const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo };
	}
}

function drawBall() {
	cgc.beginPath();
	cgc.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	cgc.fillStyle = "#e65100";
	cgc.fill();
	cgc.closePath();
}

function drawPaddle() {
	cgc.beginPath();
	cgc.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	cgc.fillStyle = "#512da8";
	cgc.fill();
	cgc.closePath();
}

function drawScore() {
	cgc.font = "20px Arial";
	cgc.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawHighScore() {
	cgc.font = "20px Arial";
	cgc.fillText(
		`High Score: ${localStorage.getItem("score")}`,
		canvas.width - 260,
		30
	);
}

function drawBricks() {
	bricks.forEach((column) => {
		column.forEach((brick) => {
			cgc.beginPath();
			cgc.rect(brick.x, brick.y, brick.w, brick.h);
			cgc.fillStyle = brick.visible ? "#26a69a" : "transparent";
			cgc.fill();
			cgc.closePath();
		});
	});
}

function draw() {
	cgc.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	drawHighScore();
	drawBricks();
}

function movePaddle() {
	paddle.x += paddle.dx;

	if (paddle.x + paddle.w > canvas.width) {
		paddle.x = canvas.width - paddle.w;
	}

	if (paddle.x < 0) {
		paddle.x = 0;
	}
}

function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1;
	}

	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1;
	}

	if (
		ball.x - ball.size > paddle.x &&
		ball.x + ball.size < paddle.x + paddle.w &&
		ball.y + ball.size > paddle.y
	) {
		ball.dy = -ball.speed;
	}

	bricks.forEach((column) => {
		column.forEach((brick) => {
			if (brick.visible) {
				if (
					ball.x - ball.size > brick.x &&
					ball.x + ball.size < brick.x + brick.w &&
					ball.y + ball.size > brick.y &&
					ball.y - ball.size < brick.y + brick.h
				) {
					ball.dy *= -1;
					brick.visible = false;

					increaseScore();
				}
			}
		});
	});

	if (ball.y + ball.size > canvas.height) {
		if (localStorage.getItem("score") < score) {
			localStorage.setItem("score", score);
		}
		finalMessage.innerText = "GAME OVER!";
		popup.style.display = "flex";
		paused = true;
		highscore = localStorage.getItem("score");
		showAllBricks();
		score = 0;
		ball.speed = 0;
	}
}

function increaseScore() {
	score++;

	if (score % (brickRowCount * brickColumnCount) === 0) {
		finalMessage.innerText = "YOU WON!";
		popup.style.display = "flex";
		paused = true;
		showAllBricks();
	}
}

function showAllBricks() {
	bricks.forEach((column) => {
		column.forEach((brick) => (brick.visible = true));
	});
}

function update() {
	movePaddle();
	moveBall();
	draw();

	if (paused === false) {
		requestAnimationFrame(update);
	}
}

draw();

function playGame() {
	paused = false;
	update();
	playBtn.disabled = true;
}

function keyDown(e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		paddle.dx = paddle.speed;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		paddle.dx = -paddle.speed;
	}
}

function keyUp(e) {
	if (
		e.key === "Right" ||
		e.key === "ArrowRight" ||
		e.key === "Left" ||
		e.key === "ArrowLeft"
	) {
		paddle.dx = 0;
	}
}

playBtn.addEventListener("click", playGame);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

playAgainBtn.addEventListener("click", (e) => {
	popup.style.display = "none";
	window.location.reload();
});
