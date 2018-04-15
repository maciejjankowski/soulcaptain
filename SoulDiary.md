<!-- TODO add gatsby.js for SoulBlog -->

<!-- to use this type in console >
node extras/blogConverter.js SoulDiary.md
-->

# 👻🎊 SoulCaptain Blog

How Soul Captain was developed

## 2018 04 15 21:04

author: Wiktor

place: Green Caffè Nero, Andersa 37

### Today we did
We've dded new Vue app that stores data from textarea and sends it using `XMLHttpRequest`:
```javascript
var request = new XMLHttpRequest();
request.open('POST', '/deck/' + appForAddingCardsToBackendBeta9000.deckId, true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send(payload);
```

We've binded data from textarea using Vue `v-model` attribute:
```html
<textarea id="soulOutput2" v-model="payload" class="form-control" rows="20" cols="80" style="margin-left: .25em">
```
[https://vuejs.org/v2/guide/forms.](https://vuejs.org/v2/guide/forms.html)

We've added event listener to textarea using Vue `v-on:click` attribute:
```html
 <input v-on:click="cardpost" form="cardForm" value="Send to backend" class="btn btn-warning btn-lg btn-block">
```
[https://vuejs.org/v2/guide/events.html#Method-Event-Handlers](https://vuejs.org/v2/guide/events.html#Method-Event-Handlers)
[https://developer.mozilla.org/en-US/docs/Web/Events](https://developer.mozilla.org/en-US/docs/Web/Events)

### Whats next?
- piece of mongoose that will get payload and writ to mongoDB

---

## 2018 04 08 17:08

author: Wiktor

place: Kolejowa 5/7

### Today we did
in deckCardAdd
- new JSON based on inputs (using document.getDocument), that is 100% compatible with mongo Scheme
- new column with preview of card using Vue: static/cardMock.js
- Maciej is trying to add mechanism for submitting JSON with cards via mongoose to Mongo
- this blog was created [showdown nodejs](https://github.com/showdownjs/showdown)
```javascript
var showdown = require('showdown'),
converter = new showdown.Converter(),
text = fs.readFileSync(process.argv[2], 'utf8');
html = converter.makeHtml(text);
fs.writeFileSync('views/common/blogcontents.html', html)
```

### Whats next?
- CRUD - adding SoulCard using mongoose

---

