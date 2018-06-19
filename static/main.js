// import Vue from 'vue';

var app = new Vue({
	el: '#app',
	data: {
		selectedCard : 0,
		cardEditMode : false,
		cardEditIndex : 0,
		soulDeck: {
			'soulDeckId': '201801191933450000000001',
			'soulDeckProperities': {
				'soulDeckTitle': 'Wiktors\' DECK',
				'soulDeckCreated': '2018.01.01'
			}
		},
		soulCard: {},
		admin: 0,
		loggedIn: 1,
		habits: []
	},


	methods: {
		saveUser: (e) => {
			e.preventDefault();
			console.warn('czy to w ogóle jest poczebne?');
			if ($('userAddForm [name="password"]').val() !== $('userAddForm [name="repeatpassword"]').val()) {
				return alert('hasła się nie zgadzają');
			}
			$.ajax({
					method: 'POST',
					url: '/user',
					data: JSON.stringify({
						payload: $('#userAddForm')
					}),
					contentType: 'application/json; charset=utf-8'
				})
				.then(() => {
					$('#saveUserButton').removeAttr('disabled');
					alert('user created');
				});

			$('#saveUserButton').attr('disabled', true);

			return false;
		},
		login: login,
		getDeck: () => {
			$.get('/deck/1').then(function _handleResponse(response) {
				app.soulDeck = response;
			});
		},
		// saveDeck : saveDeck,
		enterEditForm : (card, cardIndex) => {
			app.cardEditMode = true;
			app.cardEditIndex = cardIndex;
		},
		exitEditForm : (card) => {
			app.cardEditMode = false;
			app.cardEditIndex = 0;
			saveCard(card);
		},
		moveUp : (cardIndex) => {
			var old = app.soulDeck.cards.splice(cardIndex, 1).pop();
			app.soulDeck.cards.splice(Math.max(0, cardIndex - 1), 0, old);
			saveDeck(app.soulDeck);
		},
		moveDn : (cardIndex) => {
			var old = app.soulDeck.cards.splice(cardIndex, 1).pop();
			app.soulDeck.cards.splice(Math.min(app.soulDeck.cards.length, cardIndex + 1), 0, old);
			saveDeck(app.soulDeck);
		}
	}
});

function saveDeck(deck){
	let newDeck = {};
	let cards = deck.cards.map(card => card._id);
	Object.assign(newDeck, deck);
	newDeck.cards = cards;
	$.ajax({
		method: 'POST',
		url: '/deck/' + deck._id,
		data: JSON.stringify(newDeck),
		contentType: 'application/json; charset=utf-8'
	})
	.then(() => {
		// console.info('saved');
	});
}

function saveCard(card){
	console.log(card.soulCardSoulencje);
	$.ajax({
		method: 'POST',
		url: '/card/'+card._id,
		data: JSON.stringify(card),
		contentType: 'application/json; charset=utf-8'
	})
	.then(() => {
		console.info('saved', card.soulCardSoulencje);
	});
}

function cardDelete(deckId, cardId){
	console.warn(cardId);
	$.ajax({
		method: 'DELETE',
		url: '/deck/'+deckId+'/card/'+cardId,
		contentType: 'application/json; charset=utf-8'
	})
	.then(() => {
		console.info('Deleted card', cardId, 'from deck', deckId);
	});
}

function login(e) {
	e.preventDefault();
	$.ajax({
		method: 'POST',
		url: '/login',
		data: $('#loginForm').serializeArray(),
	}).then(() => {
		app.loggedIn = 1;
		console.log('logged in');
	});
}


$(function _onload() {

	$.get('/deck').then(function _handleResponse(response) {
		app.soulDeck = response;
	});

}); // onload


// Navbar js

// el.classList.add(className); i tutaj 'el' to 'document.getElementById("leftNavbar")'
function closeNav() {
	document.getElementById("leftNavbar").classList.add("hideNavbarLeft");
	document.getElementById("navbarLeftNavTag").classList.remove("fixed-top");

	document.getElementById("closeNavButton").classList.add("hideButton");
	document.getElementById("openNavButton").classList.remove("hideButton");
}

function openNav() {
	document.getElementById("leftNavbar").classList.remove("hideNavbarLeft");
	document.getElementById("navbarLeftNavTag").classList.add("fixed-top");

	document.getElementById("openNavButton").classList.add("hideButton");
	document.getElementById("closeNavButton").classList.remove("hideButton");
}