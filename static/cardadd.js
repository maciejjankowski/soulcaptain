// TODO "wciągać poprawne wartości z obiektu"
var soulencjaSeedData = {
    soulIdParent: "",
    soulType: "",
    language: "",
    text: "",
    image: "",
    audio: "",
    video: "",
    reason: "",
    habit: {
        type: "", // ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
        displayType: "",
        frequency: "", // ['just once', hourly','daily','weekly','monthly','quarterly','annually','bi-annually']	
        timePreference: [], // select date/time, select place, at mornings, mid-day, lunch, end-of-day, weekend, laetr today, next week, next weekend, sunday, end of month, end of year, some day
        coolDown: "", // czas do następnego powtórzenia - kkiedy nie pokazywać karty
        timestamps: []
    },
    source: {
        author: "",
        created: "",
        source: "",
        sourceLink: ""
    }
};
var cardSeedData = {
    soulCardTitle: 'SoulCard Title', 
    soulCardText: 'SoulCard text',
    soulCardAuthor: 'SoulCard author',
    soulCardSoulencje : [soulencjaSeedData]
};

Object.assign(cardSeedData, populatedCardData);

var appForAddingCardsToBackendBeta9000 = new Vue({
    el: '#cardadder',
    data: {
        payload: 'Here will appear your SoulCard schema :D',
        deckId:  '5aaeb1e14adb0227720caf0f',
        cardData : cardSeedData,
        // soulCardText : "XYZ",
        // soulCardAuthor : "XXY"
    },
    methods: {
        addNewSoulencja : function(){
            appForAddingCardsToBackendBeta9000.cardData.soulCardSoulencje.push(soulencjaSeedData);
        },
        cardpost: function () {
            let payload = appForAddingCardsToBackendBeta9000.payload;
            console.log("W tej chwili do backendu leci:", appForAddingCardsToBackendBeta9000.payload);
            var request = new XMLHttpRequest();
            request.open('POST', '/deck/' + appForAddingCardsToBackendBeta9000.deckId + '/card', true);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            request.send(payload);

            if (request.status == 200) {
                dump(request.responseText);
            } else if (request.status == 500) {
                console.log('pińcetka');
                dump(request.responseText);
            } else {
                dump(request.responseText);
            }
        },
        inputs2json: function () {
            // TODO rekaftorka - by brało z modelu
            var out2 = {
                "soulCardId": "",
                "soulCardTitle": document.getElementById("soulCardTitle").value,
                "soulCardSoulencje": [{
                    "text": document.getElementById("text").value,
                    "source": {
                        "author": document.getElementById("author").value,
                        "created": document.getElementById("created").value,
                        "source": document.getElementById("source").value,
                        "sourceLink": document.getElementById("sourceLink").value
                    },
                    "language": document.getElementById("language").value,
                    "soulType": document.getElementById("soulType").value,
                    "soulIdParent": document.getElementById("soulIdParent").value,
                }],
                "__v": 0
            };
            appForAddingCardsToBackendBeta9000.payload = JSON.stringify(out2, null, 2);
        }
    }
});

function dump(dumpara) {
    console.log(dumpara)
}



// TODO wczytywanie danych z istniejącej karty celem ładowania do formularza