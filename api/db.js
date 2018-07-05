// TODO
// każdy plik .js z api powinien tu pukać po save, read i tak dalej

module.exports = function (deps) {
  let Card = deps.Card;
  let Deck = deps.Deck;
  let logger = deps.logger;

  return {
    'createOrUpdateCard': function (cardBody, deckId, cb) {
      if (typeof cardBody._id === 'undefined') {
        let card = new Card(cardBody); // req;
        card.save().then((response) => {
          Deck.findOne({
            _id: deckId
          }).then(function _handleFoundDeck(foundDeck) {
            foundDeck.cards.push(response._id);
            foundDeck.save().then(function (result) {
              // logger.info('updated deck with new card', result);
              cb(null, result);
              // res.send('OK');
            }).catch(function _handleError(err) {
              logger.info('zapis się wysrał', err);
              cb('zapis się wysrał');
              // res.status(400).send('NOT OK');
            });
          }).catch(err => {
            logger.info('createCard error in .then(function _handleFoundDeck(foundDeck)', err);
            // res.status(400).send('NOT OK');
            cb('find one error');
          });
        }).catch(err => {
          logger.info('createCard error in card.save().then((response)' + '\n' + err.message);
          // res.status(400).send('NOT OK');
          cb('card Save error');
        });
      } else {
        Card.findOne({
          _id: cardBody._id || cardBody.cardId
        }).then(card => {
          Object.assign(card, cardBody);
          card.save().then(() => {
            // res.send('OK');
            cb(null, card);
          }).catch(err => {
            logger.info('update failed', err);
            // res.status(400).send('NOT OK');
            cb('BAD');
          });
        }).catch(err => {
          logger.info('szukanie/zapis karty failed', err);
          // res.status(400).send('NOT OK');
          cb('BAD');
        });
      }
    },
  };
};