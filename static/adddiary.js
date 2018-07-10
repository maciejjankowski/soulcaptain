var appForAddingDiary = new Vue({
    el: '#diaryadder',
    data: {
        diaryDate: 'Enter date',
        diaryNote: 'Write your note here',
        diaryMood: 'What is your mood? :) :| :(',
        payload: {}
    },
    methods: {
        cardpost: function () {
            let payload = appForAddingDiary.payload;
            console.log('W tej chwili do backendu leci:', appForAddingDiary.payload);
            var request = new XMLHttpRequest();
            request.open('POST', '/diary', true);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.send(payload);

            if (request.status == 200) {
                dump(request.responseText);
            } else if (request.status == 500) {
                console.log('pińcetka'), dump(request.responseText);
            } else {
                dump(request.responseText);
            }
        },
        inputs2json: function () {
            var out2 = {
                'diaryDate': document.getElementById('diaryDate').value,
                'diaryNote': document.getElementById('diaryNote').value,
                'diaryMood': document.getElementById('diaryMood').value,
                '__v': 0
            };
            appForAddingDiary.payload = JSON.stringify(out2, null, 2);
        }
    }
});

function dump(dumpara) {
    console.log(dumpara);
}