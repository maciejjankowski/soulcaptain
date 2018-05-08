module.exports = function (deps) {
	let app = deps.app;
	let mongoose = deps.mongoose;
	const logger = deps.logger;
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
			logger.info('listOfDecks', JSON.stringify(listOfDecks, null, 2));
			Deck.find({
				$or: listOfDecks
			}).then(function _handleDecks(decks) {
				logger.info('decks:', decks);
				// TODO: nie pokazywać userowi wszystkich pól obiektu
				res.send(decks);
			}).catch(function _handleDeckFail(err) {
				logger.info('deck error', err);
			});

		} else {
			logger.error('niezalogowany');
			res.status(403).send('Log in first');
		}
	});

	app.post('/card2', (req, res) => {
		var cardData = {};
		var card = new Card(cardData);

		card.save(function (err) {
			if (err) {
				logger.info(err);
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
		logger.info('this is searched', inputDeck._id);

		Deck.findOne({
				_id: inputDeck._id
			})
			.populate({
				path: 'cards',
			})
			.then(deck => {
				logger.info('this is found', JSON.stringify(deck, null, 2));
				logger.info('this is added', JSON.stringify(inputDeck, null, 2));
				Object.assign(deck, inputDeck);

				// read all cards and save individually

				inputDeck.cards.forEach((inputCard) => {
					if (deck.cards.filter((card) => card._id == inputCard._id).length) {
						// update
						logger.info('if dla funkcji deck.cards.filter');
						Card.findOne().then({});
					} else {
						// save, getId, add Id
						deck.cards.push(inputCard);

					}
				});

				logger.info('this gets saved', JSON.stringify(deck, null, 2));
				// return;
				deck.soulDeckTitle = 'XYZ';
				deck.save().then(result => {
					logger.info(
						'SoulCaptain saved the deck (and your soul).',
						JSON.stringify(result, null, 2)
					);
					res.send('OK');
				}).catch((err) => {
					logger.info('save error', err);
					res.status(400).send('BAD\n' + JSON.stringify(err, null, 2));
				});
			}).catch(function pokaError(error) {
				logger.info('to je error z findOne', error);
				res.status(400).send('BAD\n' + JSON.stringify(error, null, 2));
			});
	} // saveDeck

	function createCard(req, res) {
		let deckId = req.params.deckId;
		logger.info(req.user.decks[0]._id, deckId, ' decks found');
		if ((!req.user || !req.user.decks) || !req.user.decks.filter((deck) => deck._id == deckId).length) {
			logger.info('trying to save someone elses card or not logged in');
			res.status(403).send('NOT OK');
			return -1;
		}

		let card = new Card(req.body); // req;
		card.save().then((response) => {
			Deck.findOne({
				_id: deckId
			}).then(function _handleFoundDeck(foundDeck) {
				foundDeck.cards.push(response._id);
				foundDeck.save().then(function (result) {
					logger.info('updated deck with new card', result);
					res.send('OK');
				}).catch(function _handleError(err) {
					logger.info('zapis się wysrał', err);
					res.status(400).send('NOT OK');
				});
			}).catch(err => {
				logger.info('createCard error in .then(function _handleFoundDeck(foundDeck)', err);
				res.status(400).send('NOT OK');
			});
		}).catch(err => {
			logger.info('createCard error in card.save().then((response)', err);
			res.status(400).send('NOT OK');
		});
	}

	function updateCard(req, res) {
		let formCard = req.body;
		if (req.method === 'GET') {
			formCard = require('../extras/scheme-soulcard.json');
		}
		let cardId = formCard._id || req.params.cardId;
		if ((!req.user || !req.user.decks) || !req.user.decks.reduce((p, c) => {
				return p || (c.cards.findIndex((card) => card._id == cardId) > -1);
			}, 0)) {
			logger.info('trying to save someone elses card or not logged in');
			res.status(403).send('NOT OK');
			return -1;
		}

		Card.findOne({
			_id: cardId
		}).then(card => {
			Object.assign(card, formCard);
			card.save().then(() => {
				res.send('OK');
			}).catch(err => {
				logger.info('update failed', err);
				res.status(400).send('NOT OK');
			});
		}).catch(err => {
			logger.info('szukanie/zapis karty failed', err);
			res.status(400).send('NOT OK');
		});
	}

	function updateDeck(req, res) {
		let deckId = req.params.deckId;
		let inputDeck = req.body;
		if ((!req.user || !req.user.decks) || req.user.decks.filter((deck) => deck._id == deckId).length) {
			logger.info('trying to save someone elses card or not logged in');
			res.status(403).send('NOT OK');
			return -1;
		}

		Deck.findOne({
			_id: deckId
		}).then(function _handleFoundDeck(foundDeck) {
			Object.assign(foundDeck, inputDeck);
			foundDeck.save().then(function (result) {
				logger.info('updated deck with new card', result);
				res.send('OK');
			}).catch(function _handleError(err) {
				logger.info('zapis się wysrał', err);
				res.status(400).send('NOT OK');
			});
		}).catch(err => {
			logger.info('createCard error in .then(function _handleFoundDeck(foundDeck)', err);
			res.status(400).send('NOT OK');
		});
	}

	function getCard(req, res) {
		let cardId = req.params.cardId;
		// TODO allow reading public cards
		// TODO refactor - IMPORTNANT
		// TODO cards not populated!!!
		if ((!req.user || !req.user.decks) || !req.user.decks.reduce((p, c) => {
				return p || (c.cards.findIndex((card) => card._id == cardId) > -1);
			}, 0)) {
			logger.info('trying to read someone elses card or not logged in');
			res.status(403).send('NOT OK');
			return -1;
		}
		Card.findOne({
			_id: cardId
		}).then(card => {
			res.send(card);
		}).catch(() => {
			res.status(404).send('NOT OK');
		});
	}

	function deleteCard(req, res) {
		let cardId = req.params.cardId;
		let deckId = req.params.deckId;
		logger.info('decks', req.user.decks.map((deck)=>deck._id));
		if ((!req.user || !req.user.decks) || !req.user.decks.filter((deck) => deck._id == deckId).length) {
			logger.info('trying to read someone elses card or not logged in', deckId, cardId);
			res.status(403).send('NOT OK');
			return -1;
		}

		Card.findOne({
			_id: cardId
		}).then(card => {
			logger.info('renoving', cardId, ' from ', deckId);
			card.remove().then((result) => {
					logger.info('removed card', result);
					if (req.user.decks.filter((deck) => deck._id == deckId).length) {
						Deck.findOne({
							_id: deckId
						}).then(deck => {
							let cardIndex = deck.cards.indexOf(cardId);
							logger.info('cards', cardIndex);
							if (cardIndex > -1) {
								deck.cards.splice(cardIndex, 1);
								deck.save().then(() => {
									res.send('OK');
									logger.info('deck saved');
								}).catch((err) => {
									res.status(400).sent('NOT OK');
									logger.info('decks save not working', err);
								});
							} else {
								res.status(400).send('NOT OK???');
								logger.info('to się dzieje');
							}
						}).catch((err) => {
							res.status(400).send('NOT OK??');
							logger.error('not found', err);
						});
					} else {
						res.status(400).send('NOT OK?');
					}
				})
				.catch(err => {
					res.status(400).send('NOT OK');
					logger.info('delete not deletes?', err);
				});
		}).catch(err => {
			logger.info('card not found', err);
			res.status(404).send('NOT OK');
		});
	}

	//TODO parkondkes: usunąć to co służyło do testowania


	app.get('/card/:cardId', getCard);
	app.put('/card/:cardId', updateCard);
	app.post('/card/:cardId', updateCard);
	app.get('/card/:cardId/update', updateCard);

	app.post('/deck/:deckId', saveDeck);
	app.put('/deck/:deckId', updateDeck);
	app.get('/deck/save', saveDeck);
	app.post('/deck/:deckId/card', createCard);
	app.get('/deck/:deckId/card/save', createCard);

	app.delete('/deck/:deckId/card/:cardId', deleteCard);
	app.get('/deck/:deckId/card/:cardId/delete', deleteCard);

	app.get('/deck/:deckId/cards/delete', (req, res) => {
		let templateData = {
			decks : req.user.decks,
			cards : req.user.decks[0].cards
		};
		res.render('deleteCards.html', templateData);
	});
};