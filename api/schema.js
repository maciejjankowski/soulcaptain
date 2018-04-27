// TODO @maciej dodać do sheme isHabitable czyli dodać wszelkie inforamcje potrzebne by zrobić odhaczankę posługując się tym modelem
module.exports = function (deps) {
	const mongoose = deps.mongoose;
	const Card = mongoose.model(
		'Card', // http://mongoosejs.com/docs/guide.html
		{
			soulCardTitle: String,
			soulCardSoulencje: [
				{
					soulIdParent: String,
					soulType: String,
					language: String,
					text: String,
					image: String,
					audio : String,
					video : String,
					reason :String,		  
					habit:{
						type: String, // ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
						displayType : String,
						frequency : String,  // ['just once', hourly','daily','weekly','monthly','quarterly','annually','bi-annually']	
						timePreference : [], // select date/time, select place, at mornings, mid-day, lunch, end-of-day, weekend, laetr today, next week, next weekend, sunday, end of month, end of year, some day
						coolDown : String, // czas do następnego powtórzenia - kkiedy nie pokazywać karty
						timestamps : [Date]
					},
					source: {
						author: String,
						created: Date,
						source: String,
						sourceLink: String
					}
				}
			],
			owner: String
		}
	);

	const User = mongoose.model('User', {
		loginId: String,
		loginType: String,
		email: String,
		password: String,
		personalInfo: [
			{
				firstName: String,
				lastName: String
			}
		],
		decks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Deck'
			}
		]
	});
	const Deck = mongoose.model('Deck', {
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Card'
			}
		]
	});

	return {
		User,
		Card,
		Deck
	};
};
