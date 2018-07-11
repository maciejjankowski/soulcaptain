module.exports = function (deps) {
    let app = deps.app; // server.js // deps
    let mongoose = deps.mongoose;
    const DiaryEntry = mongoose.models.diaryEntry;

    app.post('/diary', function (req, res) {
        let diaryEntry = new DiaryEntry(req.body);

        diaryEntry.save(function (err) {
            if (err) {
                console.log(err);
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
        });
    }); // app.get
};