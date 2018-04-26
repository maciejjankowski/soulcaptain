module.exports = function (deps) {
    let app = deps.app; // server.js // deps
    let mongoose = deps.mongoose;
    const DiaryEntry = mongoose.models.diaryEntry;

    app.get('/diary', function (req, res) {

        var diaryEntryData = {
            diaryDate: "String",
            diaryNote: "String",
            diaryMood: "String"
        };

        req.body = diaryEntryData;

        let diaryEntry = new DiaryEntry(req.body);

        console.log (diaryEntryData, req.body, diaryEntry);

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