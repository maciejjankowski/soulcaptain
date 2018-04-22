module.exports = function (deps) {
	let app = deps.app;
	let mongoose = deps.mongoose;
	const Card = mongoose.models.Card;
	const Deck = mongoose.models.Deck;
	// const Deck = mongoose.models.Deck;

	app.get('/deck', (req, res) => {
		// let deckId = req.params.deckId;
		let userDecks = req.user && req.user.decks; // TODO zwróci pierwszy fałsz lub ostatnia prawda
		if (userDecks && userDecks.length) {
			Deck.findOne({
					'_id': userDecks[0]
				})
				.populate('cards')
				.then((deck) => {
					res.send(deck);
				});
		} else {
			res.send({});
		}
	});

	app.get('/decks', (req, res) => {
		if (req.user && req.user.decks) {
			let userDecks = req.user && req.user.decks;

			let listOfDecks = userDecks.map(deckId => ({
				_id: deckId
			}));
			console.log('listOfDecks', JSON.stringify(listOfDecks, null, 2));
			Deck.find({
				$or: listOfDecks
			}).then(function _handleDecks(decks) {
				console.log('decks:', decks);
				// TODO: nie pokazywać userowi wszystkich pól obiektu
				res.send(decks);
			}).catch(function _handleDeckFail(err) {
				console.log('deck error', err);
			});

		} else {
			console.error('niezalogowany');
			res.send(403, 'Log in first');
		}
	});

	app.post('/card2', (req, res) => {
		var cardData = {};
		var card = new Card(cardData);

		card.save(function (err) {
			if (err) {
				console.log(err);
				res.send(400, {
					status: 'error',
					error: 'problem saving',
					details: err
				});
			} else {
				res.send({
					status: 'ok'
				});
			}
		}); // card save
	});

	function saveDeck(req, res) {
		// find deck by Id
		// req.user.decks.filter((deck)=>deck.id === req.params.deckId)
		let mockDeck = require('../extras/scheme-souldeck.json');
		let inputDeck = mockDeck;
		console.log('this is searched', inputDeck._id);

		let deck = Deck.findOne({
				_id: inputDeck._id
			})
			.populate({
				path: 'cards',
			})
			.then(deck => {
				console.log('this is found', JSON.stringify(deck, null, 2));
				console.log('this is added', JSON.stringify(inputDeck, null, 2));
				Object.assign(deck, inputDeck);

				// read all cards and save individually

				inputDeck.cards.forEach((inputCard) => {
					if (deck.cards.filter((card) => card._id === inputCard._id).length) {
						// update
						console.log('if dla funkcji deck.cards.filter');
						Card.findOne().then({});
					} else {
						// save, getId, add Id
						deck.cards.push(inputCard);

					}
				});

				console.log('this gets saved', JSON.stringify(deck, null, 2));
				// return;
				deck.soulDeckTitle = 'XYZ';
				deck.save().then(result => {
					console.log(
						'SoulCaptain saved the deck (and your soul).',
						JSON.stringify(result, null, 2)
					);
					res.send('OK');
				}).catch((err) => {
					console.log('save error', err);
					res.send('BAD\n' + JSON.stringify(err, null, 2));
				});
			}).catch(function pokaError(error) {
				console.log('to je error z findOne', error);
				res.send('BAD\n' + JSON.stringify(error, null, 2));
			});

	} // saveDeck

	function createCard(req, res) {
		let deckId = req.params.deckId;
		if ((!req.user || !req.user.decks) || !req.user.decks.indexOf(deckId) > -1){
			console.log('trying to save someone elses card or not logged in');
			res.send(403, 'NOT OK');
			return -1;
		}

		let card = new Card(req.body); // req;
		card.save().then((response) => {
			Deck.findOne({
				_id: deckId
			}).then(function _handleFoundDeck(foundDeck) {
				foundDeck.cards.push(response._id);
				foundDeck.save().then(function (result) {
					console.log('updated deck with new card', result);
					res.send('OK');
				}).catch(function _handleError(err) {
					console.log('zapis się wysrał', err);
					res.send(400, 'NOT OK');
				});
			}).catch(err => {
				console.log('createCard error in .then(function _handleFoundDeck(foundDeck)', err);
				res.send(400, 'NOT OK');
			});
		}).catch(err => {
			console.log('createCard error in card.save().then((response)', err);
			res.send(400, 'NOT OK');
		});		
	}

	function updateCard(req, res){
		let formCard = req.body;
		if (req.method === 'GET'){
			formCard = require('../extras/scheme-soulcard.json');
		}
		let cardId = formCard._id || req.params.cardId;
		if ((!req.user || !req.user.decks) || !req.user.decks.reduce((p, c) => {
			return p || (c.cards.findIndex((card) => card._id === cardId) > -1);
		}, 0)){
			console.log('trying to save someone elses card or not logged in');
			res.send(403, 'NOT OK');
			return -1;
		}

		Card.findOne({_id : cardId}).then(card=>{
			Object.assign(card, formCard);
			card.save().then(() => {
				res.send('OK');
			}).catch(err => {
				console.log('update failed', err);
				res.send(400, 'NOT OK');
			});
		}).catch(err => {
			console.log('szukanie/zapis karty failed', err);
			res.send(400, 'NOT OK');
		});
		
	}

	function updateDeck(req, res){
		let deckId = req.params.deckId;
		let inputDeck = req.body;
		if ((!req.user || !req.user.decks) || req.user.decks.indexOf(deckId) === -1){
			console.log('trying to save someone elses card or not logged in');
			res.send(403, 'NOT OK');
			return -1;
		}

		Deck.findOne({
			_id: deckId
		}).then(function _handleFoundDeck(foundDeck) {
			Object.assign(foundDeck, inputDeck);
			foundDeck.save().then(function (result) {
				console.log('updated deck with new card', result);
				res.send('OK');
			}).catch(function _handleError(err) {
				console.log('zapis się wysrał', err);
				res.send(400, 'NOT OK');
			});
		}).catch(err => {
			console.log('createCard error in .then(function _handleFoundDeck(foundDeck)', err);
			res.send(400, 'NOT OK');
		});
	}

	function getCard(req, res){
		let cardId = req.params.cardId;
		// TODO allow reading public cards
		if ((!req.user || !req.user.decks) || !req.user.decks.reduce((p, c) => {
			return p || (c.cards.findIndex((card) => card._id === cardId) > -1);
		}, 0)){
			console.log('trying to read someone elses card or not logged in');
			res.send(403, 'NOT OK');
			return -1;
		}
		Card.findOne({_id : cardId}).then(card => {
			res.send(card);
		}).catch(err => {
			res.send(404, 'NOT OK');
		});
	}

	app.post('/deck/:deckId', saveDeck);
	app.put('/deck/:deckId', updateDeck);
	app.get('/deck/save', saveDeck);
	app.post('/deck/:deckId/card', createCard);
	app.get('/deck/:deckId/card/save', createCard);
	app.put('/card/:cardId', updateCard);
	app.post('/card/:cardId', updateCard);
	app.get('/card/:cardId/update', updateCard);
	app.get('/card/:cardId', getCard);
};
