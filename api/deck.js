module.exports = function (deps) {
	let app = deps.app;
	let mongoose = deps.mongoose;
	const Card = mongoose.models.Card;
	const Deck = mongoose.models.Deck;
	// const Deck = mongoose.models.Deck;

	app.get('/deck', (req, res) => {
		// let deckId = req.params.deckId;
		let userDecks = req.user.decks;
		if (userDecks.length){
			Deck.findOne({'_id' : userDecks[0]})
				.populate('cards')
				.then((deck) => {
					res.send(deck);
				});
		} else {
			res.send({});

		}
	});

	app.get('/decks', (req, res) => {
		if (typeof req.user && req.user.decks){
			let userDecks = req.user.decks;

			let listOfDecks = userDecks.map(deckId =>({
				_id : deckId
			}));
			console.log('listOfDecks', JSON.stringify(listOfDecks, null,2 ));
			Deck.find({ $or : listOfDecks }).then(function _handleDecks(decks) {
				console.log('decks:', decks);
				// TODO: nie pokazywać userowi wszystkich pól obiektu
				res.send(decks);
			}).catch(function _handleDeckFail(err){
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
				res.send({status: 'ok'});
			}
		}); // card save
	});

	app.post('/deck/:deckId', (req, res) => {
		// find deck by Id
		// req.user.decks.filter((deck)=>deck.id === req.params.deckId)

		let deck = Deck.findOne({deckId: req.params.deckId}).then(deck => {
			Object.assign(deck, req.body);
			deck.save().then(result => {
				console.log(
					'SoulCaptain saved the deck (and your soul).',
					result
				);
			});
		});

		Deck.save((err, data) => {
			if (err) {
				console.log(err);
				res.send(400, {
					status: 'error',
					error: 'problem saving',
					details: err
				});
			} else {
				res.send({status: 'ok'});
			}
		});
	});
};
