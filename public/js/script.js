// connects to the dashboard.handlebars
let jokeContainer = document.querySelector(".joke-container")
console.log(jokeContainer.innerText);
// flow of data 2 requests the code from the api/jokes -> go to the joke-route
fetch('/api/jokes')
    // returns the response from the api/jokes
  .then(response => response.json())
  .then(data => jokeContainer.innerText = decodeURI(data));