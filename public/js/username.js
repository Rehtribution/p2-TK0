// function showUser(){
    
// let displayName = document.querySelector(".displayName-container")
// console.log(displayName.innerText)

// fetch('/api/users')
//     // returns the response from the api/jokes
//     .then(response => response.json())
//     .then(data => displayName.innerText = decodeURI(data));
//     res.render("dashboard", {
//         userName : req.user.Name,
//     });

function user() {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
}
user()