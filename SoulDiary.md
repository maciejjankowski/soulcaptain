<!-- TODO add gatsby.js for SoulBlog ? -->
<!-- TODO add posts from the past based on real Wiktor diary of good things -->

<!-- to use this type in console >
node extras/blogConverter.js SoulDiary.md
-->

<!-- cheatsheet 
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
-->


# 👻🎊 SoulCaptain Blog

How Soul Captain is being developed. Step-by-step. Day-by-day

---

## 2018 04 15 21:04

author: Wiktor

place: Green Caffè Nero, Andersa 37

### Today we did

**Card adder**

We've dded new Vue app that stores data from textarea and sends it using `XMLHttpRequest`:
```javascript
var request = new XMLHttpRequest();
request.open('POST', '/deck/' + appForAddingCardsToBackendBeta9000.deckId, true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send(payload);
```
[https://developer.mozilla.org/docs/XMLHttpRequest](https://developer.mozilla.org/docs/XMLHttpRequest)

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

**Varia**

Added [highlightjs](https://highlightjs.org/usage/) ([Github](https://github.com/isagalaev/highlight.js)) for SoulBlog :D

### Whats next?
- Maciej: piece of mongoose that will get payload and write to mongoDB
- Wiktor: user view based on CardAdd: fields, v-model bind in HTML, JSON ready for mongoDB user model, POST using `XMLHttpRequest`
 
---

## 2018 04 08 17:08

author: Wiktor

place: Kolejowa 5/7

### Today we did

**Card adder**

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

