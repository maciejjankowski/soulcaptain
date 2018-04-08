<!-- add gatsby.js for SoulBlog -->
<!-- to use this type in console > node extras/blogConverter.js static/blog/SoulDiary.md -->

# 👻🎊 SoulCaptain Blog

How Soul Captain was developed

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
----

