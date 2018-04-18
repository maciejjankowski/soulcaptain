<!-- TODO add gatsby.js for SoulBlog ? -->
<!-- TODO add posts from the past based on real Wiktor diary of good things -->
 
<!-- to use this type in console >
node extras/blogConverter.js soulblog.md
-->
 
<!-- cheatsheet 
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
-->
 
 
# 👻🎊 SoulCaptain Blog
 
How Soul Captain is being developed. Step-by-step. Day-by-day
 
---

## 2018 04 18 18:04


Wiktor learned

https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Operator_new


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
commit:b277b0
highlightjs