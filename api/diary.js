module.exports = function(deps) {
  let app = deps.app; // server.js // deps
  const diaryDb = require('./db/diary.js')(deps);

  app.post('/diary', function(req, res) {
    const diaryBody = req.body;
    diaryDb
      .saveDiary(diaryBody)
      .then(() => {
        res.send('OK');
      })
      .catch(() => {
        res.status(500).send('NOT');
      });
  }); // app.post

  app.delete('/diary/:diaryId', (req, res) => {
    const diaryId = req.params.diaryId;
    diaryDb
      .deleteDiary(diaryId)
      .then(() => res.send('OK'))
      .catch(() => res.status(500).send('NOT'));
  });

  app.get('/diary', (req, res) => {
    diaryDb
      .getDefaultDiaryList()
      .then(results => {
        res.send(results);
      })
      .catch(() => {
        res.status(500).send('not');
      });
  });
};
