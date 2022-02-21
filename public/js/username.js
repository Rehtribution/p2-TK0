//not working YET
function user() {
    
    let displayName = document.querySelector(".displayName-container")
    
    fetch('/api/users')
    .then(response => response.json())
    .then(data => displayName)
}
user()




// function showUser(){

//     fetch('/api/users')
//     .then(response => response.json())
//     .then(data => displayName.innerText;
//     res.render("dashboard", {
//         userName : req.user.Name,
//     });