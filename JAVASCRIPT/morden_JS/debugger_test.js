function hello (name) {
	let pharse = `Hello, ${name}!`;

	debugger;

	say(pharse);
}

function say(pharse) {
	alert(`** ${pharse} **`);
}

hello('john')