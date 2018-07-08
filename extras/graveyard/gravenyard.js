$('.board-card-footer').each((i, e) => {
  console.log($(e).get(0).innerHTML += '<a data-taskId="..." href="#!">&#9654;</a>');
});





function saveDeckX(req, res) {
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