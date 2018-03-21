module.exports = function (deps) {
	let app = deps.app;
	let mongoose = deps.mongoose;
	const Card = mongoose.models.Card;
	const Deck = mongoose.models.Deck;
	// const Deck = mongoose.models.Deck;

	// TODO @maciej https://stackoverflow.com/questions/5373198/mongodb-relationships-embed-or-reference
	app.get('/deck/:deckId', (req, res) => {
		let deckId = req.params.deckId;
		if (typeof deckId !== 'undefined'){
			Card.findOne({'deckId' : deckId}).then((cards) => {
				res.send(cards);
			});
		} else {
			res.send('SoulCaptain spotted no cards in da deck');
		}
	});

	app.get('/decks', (req, res) => {
		Deck.find().then((deck) => {
			res.send(deck);
		});
	});

	app.post('/card2', (req, res) => {
		var cardData = {};
		var card = new Card(cardData);

		card.save(function (err) {
			if (err) {
				console.log(err);
				res.send(400, { status: 'error', error: 'problem saving', details: err });
			} else {
				res.send({ status: 'ok' });
			}
		}); // card save
	});

	app.post('/deck/:deckId', (req, res) => {
		// find deck by Id
		// req.user.decks.filter((deck)=>deck.id === req.params.deckId)

		let deck = Deck.findOne({'deckId' : req.params.deckId})
			.then((deck)=>{
				Object.assign(deck, req.body);
				deck.save().then((result) => {
					console.log('SoulCaptain saved the deck (and your soul).', result);
				});
			});

		Deck.save( (err, data) => {
			if (err) {
				console.log(err);
				res.send(400, { status: 'error', error: 'problem saving', details: err });
			} else {
				res.send({ status: 'ok' });
			}
		});
	});
};