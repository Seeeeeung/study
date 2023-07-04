const menuHome = () => {
	document.getElementById('contentFrame').setAttribute('src','home.html');
	document.getElementById('menuHome').style = 'color:#000; background-color:#fff;'
	document.getElementById('menuJuckbox').style = 'color:#fff; background-color:#298eb5;'
	document.getElementById('menuGame').style = 'color:#fff; background-color:#298eb5;'
}
const menuJuckbox = () => {
	document.getElementById('contentFrame').setAttribute('src','juckbox.html');
	document.getElementById('menuJuckbox').style = 'color:#000; background-color:#fff;'
	document.getElementById('menuHome').style = 'color:#fff; background-color:#298eb5;'
	document.getElementById('menuGame').style = 'color:#fff; background-color:#298eb5;'
	
}
const menuGame = () => {
	document.getElementById('contentFrame').setAttribute('src','game.html');
	document.getElementById('menuGame').style = 'color:#000; background-color:#fff;'
	document.getElementById('menuJuckbox').style = 'color:#fff; background-color:#298eb5;'
	document.getElementById('menuHome').style = 'color:#fff; background-color:#298eb5;'
}
