//games highscores will be pulled from local storage and user session? then follow the connected routes using the model set up
//intending to reference the code quiz highscore.js
// window.onload = () => {
//     getScore();
// }

// const highscore = () => {
//     console.log(fetch('/api/highscore'))
//     .then((response) => {
//         console.log(response);
//     })
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


async function getHighscores() {
    let url = '/api/highscore';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderScores() {
    let users = await getHighscores();
    let html = '';
    users.forEach(score => {
        let htmlSegment = `<button class="score-box">
                            
                            <h2>${users.username} ${users.score}</h2>
                        </button>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();