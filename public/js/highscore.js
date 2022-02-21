// WORKING 
const highscore = () => {
    fetch("/api/highscore")
        // .then(response => {
        //     response.json()
        //     console.log(response);
        // })
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
}
highscore()
// WORKING END 





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




// not working YET but good chance I think
// async function renderScores() {
//     let users = await getHighscores();
//     let html = '';
//     users.forEach(score => {
//         let htmlSegment = `<button class="score-box">
                            
//                             <h2>${users.username} ${users.score}</h2>
//                         </button>`;

//         html += htmlSegment;
//     });

//     let container = document.querySelector('.container');
//     container.innerHTML = html;
// }







// failed attempts


// window.onload = () => {
//     getScore();
// }

// function getScore() {
//     let breakoutScore = document.querySelector(".breakout-score")
//     console.log(breakoutScore.innerText);

//     fetch('/api/highscore)
//         .then(data => {return data.json();
//         })

//         .then(post => {console.log(post.score)
//         });
//         // .then(data => breakoutScore.innerText = data)
// };

// getScore();


// async function getHighscores() {
//     let url = '/api/highscore';
//     try {
//         let res = await fetch(url);
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }

// renderUsers();