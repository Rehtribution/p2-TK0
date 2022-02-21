//games highscores will be pulled from local storage and user session? then follow the connected routes using the model set up
//intending to reference the code quiz highscore.js

function printHighscores() {
	// either get scores from localstorage or set to empty array
	var highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];

	// sort highscores by score property in descending order
	highscores.sort(function (a, b) {
		return b.score - a.score;
	});

	highscores.forEach(function (score) {
		// create li tag for each high score
		var liTag = document.createElement("li");
		liTag.textContent = score.initials + " - " + score.score;

		// display on page
		var olEl = document.getElementById("highscores");
		olEl.appendChild(liTag);
	});
}

// run function when page loads
printHighscores();
