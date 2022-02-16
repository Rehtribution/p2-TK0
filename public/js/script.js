let jokeContainer = document.querySelector(".joke-container")
console.log(jokeContainer.innerText);
fetch('/api/jokes')
  .then(response => response.json())
  .then(data => jokeContainer.innerText = decodeURI(data));