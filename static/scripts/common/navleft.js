// Navbar js

// el.classList.add(className); i tutaj 'el' to 'document.getElementById("leftNavbar")'
function closeNav() {
	document.getElementById('leftNavbar').classList.add('hideNavbarLeft');

	document.getElementById('closeNavButton').classList.add('hideButton');
	document.getElementById('openNavButton').classList.remove('hideButton');
}

function openNav() {
	document.getElementById('leftNavbar').classList.remove('hideNavbarLeft');

	document.getElementById('openNavButton').classList.add('hideButton');
	document.getElementById('closeNavButton').classList.remove('hideButton');
}