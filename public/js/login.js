async function loginFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#user-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	if (username && password) {
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		});
		
		if (response.ok) {
			console.log("logged in!");
			document.location.replace("/dashboard/");
		} else {
			console.log("wrong password");
			alert(response.statusText);
		}
	}
}

document
	.querySelector(".login-form")
	.addEventListener("submit", loginFormHandler);
