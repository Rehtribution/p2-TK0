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


// not working YET but good chance I think
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