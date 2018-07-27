module.exports = function(deps) {
  let app = deps.app;
  let mongoose = deps.mongoose;
  const logger = deps.logger;
  const Card = mongoose.models.Card;
  const Deck = mongoose.models.Deck;

  deps.Card = Card;
  deps.Deck = Deck;
  deps.User = mongoose.models.User;

  // const Deck = mongoose.models.Deck;
  const db = require('./db.js')(deps);

  app.post('/card2', function(req, res) {
    return console.error('deprecated');
    var cardData = {};
    var card = new Card(cardData);

    card.save(function(err) {
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
    const inputDeck = req.body;
    db.createOrUpdateDeck(inputDeck)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.status(444).send('NOT OK?');
      });
  }

  function createCard(req, res) {
    let deckId = req.params.deckId;
    // let cardId = req.params.cardId;
    let formCard = req.body;
    formCard._id = formCard._id || req.params.cardId;
    // logger.info(req.user.decks[0]._id, deckId, ' decks found');
    if (
      !req.user ||
      !req.user.decks ||
      !req.user.decks.filter(deck => deck._id == deckId).length
    ) {
      logger.info('trying to save someone elses card or not logged in');
      res.status(403).send('NOT OK');
      return -1;
    }

    db.createOrUpdateCard(formCard, deckId, (err, result) => {
      if (err) {
        res.status(500).send(String(result));
      } else {
        res.send(result);
      }
    });
  }

  function updateCard(req, res) {
    let formCard = req.body;
    if (req.method === 'GET') {
      formCard = require('../extras/scheme-soulcard.json');
    }
    let cardId = formCard._id || req.params.cardId;
    if (
      !req.user ||
      !req.user.decks ||
      !req.user.decks.reduce((p, c) => {
        return p || c.cards.findIndex(card => card._id == cardId) > -1;
      }, 0)
    ) {
      logger.info('trying to save someone elses card or not logged in');
      res.status(403).send('NOT OK');
      return -1;
    }
    db.createOrUpdateCard(formCard, null, (err, result) => {
      res.send(err || result);
    });
  }

  function updateDeck(req, res) {
    let deckId = req.params.deckId;
    let inputDeck = req.body;
    if (
      !req.user ||
      !req.user.decks ||
      req.user.decks.filter(deck => deck._id == deckId).length
    ) {
      logger.info('trying to save someone elses card or not logged in');
      res.status(403).send('NOT OK');
      return -1;
    }

    Deck.findOne({
      _id: deckId
    })
      .then(function _handleFoundDeck(foundDeck) {
        Object.assign(foundDeck, inputDeck);
        foundDeck
          .save()
          .then(function(result) {
            logger.info('updated deck with new card', result);
            res.send('OK');
          })
          .catch(function _handleError(err) {
            logger.info('zapis się wysrał', err);
            res.status(400).send('NOT OK');
          });
      })
      .catch(err => {
        logger.info(
          'createCard error in .then(function _handleFoundDeck(foundDeck)',
          err
        );
        res.status(400).send('NOT OK');
      });
  }

  function getCard(req, res) {
    let cardId = req.params.cardId;
    // TODO allow reading public cards
    // TODO refactor - IMPORTNANT
    // TODO cards not populated!!!
    if (
      !req.user ||
      !req.user.decks ||
      !req.user.decks.reduce((p, c) => {
        return p || c.cards.findIndex(card => card._id == cardId) > -1;
      }, 0)
    ) {
      logger.info('trying to read someone elses card or not logged in');
      res.status(403).send('NOT OK');
      return -1;
    }
    Card.findOne({
      _id: cardId
    })
      .then(card => {
        res.send(card);
      })
      .catch(() => {
        res.status(404).send('NOT OK');
      });
  }

  function deleteDeck(req, res) {
    let deckId = req.params.deckId;
    db.deleteDeck(deckId)
      .then(() => {
        res.send('OK');
      })
      .catch((err, msg) => {
        console.error(err, msg);
        res.status(500).send('NOT');
      });
  }

  function deleteCard(req, res) {
    let cardId = req.params.cardId;
    let deckId = req.params.deckId;
    logger.info('decks', req.user.decks.map(deck => deck._id));
    if (
      !req.user ||
      !req.user.decks ||
      !req.user.decks.filter(deck => deck._id == deckId).length
    ) {
      logger.info(
        'trying to read someone elses card or not logged in',
        deckId,
        cardId
      );
      res.status(403).send('NOT OK');
      return -1;
    }

    Card.findOne({
      _id: cardId
    })
      .then(card => {
        logger.info('renoving', cardId, ' from ', deckId);
        card
          .remove()
          .then(result => {
            logger.info('removed card', result);
            if (req.user.decks.filter(deck => deck._id == deckId).length) {
              Deck.findOne({
                _id: deckId
              })
                .then(deck => {
                  let cardIndex = deck.cards.indexOf(cardId);
                  logger.info('cards', cardIndex);
                  if (cardIndex > -1) {
                    deck.cards.splice(cardIndex, 1);
                    deck
                      .save()
                      .then(() => {
                        res.send('OK');
                        logger.info('deck saved');
                      })
                      .catch(err => {
                        res.status(400).sent('NOT OK');
                        logger.info('decks save not working', err);
                      });
                  } else {
                    res.status(400).send('NOT OK???');
                    logger.info('to się dzieje');
                  }
                })
                .catch(err => {
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
      })
      .catch(err => {
        logger.info('card not found', err);
        res.status(404).send('NOT OK');
      });
  }

  //TODO parkondkes: usunąć to co służyło do testowania

  function getDecks(req, res) {
    if (req.user && req.user.decks) {
      let userDecks = req.user && req.user.decks;

      let listOfDecks = userDecks.map(deckId => ({
        _id: deckId
      }));

      logger.info('listOfDecks', JSON.stringify(listOfDecks, null, 2));
      Deck.find({
        $or: listOfDecks
      })
        .then(function _handleDecks(decks) {
          logger.info('decks:', decks);
          // TODO: nie pokazywać userowi wszystkich pól obiektu
          res.send(decks);
        })
        .catch(function _handleDeckFail(err) {
          logger.info('deck error', err);
        });
    } else {
      logger.error('niezalogowany');
      res.status(403).send('Log in first');
    }
  }

  function getDeck(req, res) {
    // let deckId = req.params.deckId;
    let userDecks = req.user && req.user.decks; // TODO zwróci pierwszy fałsz lub ostatnia prawda
    console.log('req.user', req.user, req.user && req.user.decks);
    if (req.params.deckId || (userDecks && userDecks.length)) {
      Deck.findOne({
        _id: req.params.deckId || userDecks[0]
      })
        .populate('cards')
        .then(deck => {
          res.send(deck);
        });
    } else {
      res.send({});
    }
  }

  app.get('/card/:cardId', deps.isAuthenticated, getCard);
  app.put('/card/:cardId', deps.isAuthenticated, updateCard);
  app.post('/card/:cardId', deps.isAuthenticated, updateCard);
  app.get('/card/:cardId/update', deps.isAuthenticated, updateCard);

  app.get('/deck/:deckId', deps.isAuthenticated, getDeck);
  app.get('/deck', deps.isAuthenticated, getDeck);
  app.get('/decks', deps.isAuthenticated, getDecks);

  app.post('/deck/:deckId', deps.isAuthenticated, saveDeck);
  app.put('/deck/:deckId', deps.isAuthenticated, updateDeck); //TODO  update vs save
  app.post('/deck', deps.isAuthenticated, saveDeck);
  app.get('/deck/:deckId/delete', deps.isAuthenticated, deleteDeck);
  app.delete('/deck/:deckId', deps.isAuthenticated, deleteDeck);

  app.post('/deck/:deckId/card', deps.isAuthenticated, createCard);
  app.get('/deck/:deckId/card/save', deps.isAuthenticated, createCard);

  app.delete('/deck/:deckId/card/:cardId', deps.isAuthenticated, deleteCard);
  app.get(
    '/deck/:deckId/card/:cardId/delete',
    deps.isAuthenticated,
    deleteCard
  );

  app.get('/deck/:deckId/cards/delete', deps.isAuthenticated, (req, res) => {
    let templateData = {
      decks: req.user.decks,
      cards: req.user.decks[0].cards
    };
    res.render('deleteCards.html', templateData);
  });
};
