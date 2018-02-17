module.exports = function(app, mongoose){
	const Card = mongoose.models['Card'];

	app.get('/deck',(req, res) => {
		Card.findOne().then((cards) => {
			res.send(cards);
		});
	});


	app.post('/card2', (req, res) => {
		var cardData = {};
		var card = new Card(cardData)

		card.save(function (err) {
			if (err) {
				console.log(err);
				res.send(400, {status:'error',error: 'problem saving', details : err})
			} else {
				res.send({status:'ok'});
			}
		}); // card save
	})

	app.post('/deck/:id/soulencja', (req, res)=>{

	})


}