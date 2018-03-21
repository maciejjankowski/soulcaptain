
// TODO @maciej dodać do sheme isHabitable czyli dodać wszelkie inforamcje potrzebne by zrobić odhaczankę posługując się tym modelem
module.exports = function(mongoose) {
	const Card = mongoose.model(
		"Card", // http://mongoosejs.com/docs/guide.html
		{
			coulCardId: String,
			soulCardTitle: String,
			soulCardSoulencje: [
				{
					soulIdParent: String,
					soulType: String,
					language: String,
					text: String,
					image: String,
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

	const User = mongoose.model("User", {
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
				ref: "Deck"
			}
		]
	});
	const Deck = mongoose.model("Deck", {
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Card"
			}
		]
	});

	return {
		User,
		Card,
		Deck
	};
};
