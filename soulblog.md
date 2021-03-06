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

## 2018 08 23 04:41

author: Wiktor

place: Kle

### Private beta is almost here!

🌱 minimalism, calm, love 🌱

---

## 2018 08 04 14:12

author: Wiktor

place: Kle

### How to install MongoDB locally

1. Install mongodb packet
2. On Macos: `brew install mongodb`
3. On Macos if you have problem with permissions:
```
sudo chown -R $(whoami) $(brew --prefix)/*
```
4. Install a tool for MongoDB database i.e. if you are using VS Code: https://code.visualstudio.com/docs/azure/mongodb
5. Export database fr
6. In Azure Cosmo add new MongoDB: `Create Database`
7. Add to your `.env` file config for `production` and `local`:
```
# local
DBHOST='localhost'
DBNAME='your_database_name'
DBUSER=''
DBPASS=''

# production
DBHOST='1223.supercoolhost.com'
DBNAME='your_database_name'
DBUSER='cow'
DBPASS='m00'
```
7. Import database file downloaded exported from online database:
```
mongo your_database_name your_database_name-backup-20180804-135032.js.txt
```
8. Run local envirement with your tool i.e. `nodemon`

---

## 2018 06 24 11:01

author: Wiktor

place: Costa @ Anielewicza

1. Maciej&Wiktor: backlog review
2. Wiktor: quickwin for dialog when deleting card:


```HTML
<!DOCTYPE html>
<html>
<body>

<p>To remove card click button</p>

<button onclick="myFunction()">Delete card</button>

<script>
function myFunction() {
  if (confirm("Delete card? You sure?") === true) {
    console.log('users says OK');
  } else {
    console.log('user says CANCEL');
  }
}
</script>

</body>
</html>
```

---

## 2018 06 24 11:01

author: Wiktor

place: Kle

1. Wiktor: advanced card edit only in edit mode
2. Maciej: ability to edit card in advanced mode

*Show or not HTML tak with vue.js triggered with button*

HTML - insert `v-if="deckEditMode"` for tag you want to show or hide

```html
											<div v-if="deckEditMode" class="card-header bg-transparent">

												<div v-if="!cardEditMode" class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">

													<div class="btnUpDownStyle btn-group" role="group" aria-label="second group">

														<a href="#!" v-if="!cardEditMode" v-on:click="moveUp(cardIndex)" type="btn btn-link" class="nav-link">
															<i class="fa fa-chevron-up"></i>
														</a>
														<a href="#!" v-if="!cardEditMode" v-on:click="moveDn(cardIndex)" type="btn btn-link" class="nav-link">
															<i class="fa fa-chevron-down"></i>
														</a>
													</div>

													<div class="btn-group" role="group" aria-label="second group">

														<button type="button" class="btn btn-sm btn-outline-secondary" v-if="!cardEditMode" v-on:click="enterEditForm(card, cardIndex)">
															Edit</button>
													</div>

												</div>
                                            </div>
```

js - in main.js 

add parameter that will store information wether to show tag or not, in example `deckEditMode`:

```js
var app = new Vue({
	el: '#app',
	data: {
		deckEditMode : false;
    }
})
```

write functions for changing `deckEditMode` state:

```js
		enterDeckEdit: () =>{
			app.deckEditMode = true;
		},
		exitDeckEdit: () =>{
			app.deckEditMode = false;
		},
```

finally add `v-on:click` to change `enterDeckEdit` parameter: `v-on:click="enterDeckEdit"`

```html
            <a v-on:click="enterDeckEdit" href="#!" type="btn btn-secondary" class="btn btn-outline-secondary">Edit Deck</a>
```

Done! :)


---

## 2018 06 17 12:34

author: Wiktor

place: Kolejowa 5/7

### Today we did

1. Maciej told me that i do not have to remove/add class like I did last time; i can toggle classes: http://youmightnotneedjquery.com/#toggle_class

2 Wiktor:
* better left menu
* jumbotron
* something smaller than jumbotron
* new way to navigate deck
* button remove card

3 Maciej:
* ability to reorder cards in deck!


---

## 2018 06 13 21:47

author: Wiktor

place: Kle

### Today we did

**1. Github parondkes.**

 

**2. Maciej - routing fix, authntication needed for card operations**

simply meant to add `deps.isAuthenticated` in plenty of code lines

 

**3. Wiktor: I want to make left sidebar that will collapse from left after clicking menu button**

I wanted it to work like this: [https://bootstrapious.com/p/bootstrap-sidebar](https://bootstrapious.com/p/bootstrap-sidebar)
or like this [https://www.w3schools.com/howto/howto_js_sidenav.asp](https://www.w3schools.com/howto/howto_js_sidenav.asp)

What i wrote:

CSS
```css
/* Left navbar CSS */

.hideNavbarLeft {
  margin-left: -300px;
}

.hideButton {
  display: none;
```

javascript
```javascript
// Navbar js

// el.classList.add(className); i tutaj 'el' to 'document.getElementById("leftNavbar")'
function closeNav() {
	document.getElementById("leftNavbar").classList.add("hideNavbarLeft");
	document.getElementById("closeNavButton").classList.add("hideButton");
	document.getElementById("openNavButton").classList.remove("hideButton");
}

function openNav() {
	document.getElementById("leftNavbar").classList.remove("hideNavbarLeft");
	document.getElementById("openNavButton").classList.add("hideButton");
	document.getElementById("closeNavButton").classList.remove("hideButton");
} 
```

html
```html
<nav class="navbar fixed-top navbar-light bg-light navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">👻 SoulCaptain</a>


    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

    </ul>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link active">
                <%= greeting %>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link active" href="/logout">➡️ Logout</a>
        </li>
    </ul>

    <span id="closeNavButton" class="closeNavButton" style="font-size:30px;cursor:pointer" onclick="closeNav()">&times; Menu</span>

    <span id="openNavButton" class="openNavButton hideButton" style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Menu</span>

</nav>
```

---

## 2018 04 26 22:23

author: Wiktor

place: Czytelnia, Aleja Zjednoczenia 46

### Today we did
1. Wiktor new DELL setup
2. Bump bcrypt to 2.0.x
3. Logout function [passport logout](http://www.passportjs.org/docs/logout/)
```
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
```
4. EJS with if depending on user session status
```
<% if (user &&
		user.email &&
		user.personalInfo &&
		user.personalInfo[0] &&
		user.personalInfo[0].firstName) { %>
                                <% include common/indexloggedin.html %>
                                    <% } else { %>
                                        <% include common/indexloggedout.html %>
                                            <% } %>
```

---

## 2018 04 26 22:23

author: Wiktor

place: Green Caffè Nero, Przeskok 2

### Today we did
1. Maciej new MacBook setup
2. Wiktor installed oh my zsh
3. Wiktor with help of Maciej wrote diary.js and started diary.html

---

## 2018 04 22 14:11

author: Wiktor

place: Kolejowa

### Plan for today
1. Create card - finish works
2. Learn code
3. Using Firebase; write Mood Diary as a proof of concept

## What we did today
1. Double check Card adding
2. Better UX/UI for Deck view
3. Better UX/UI for Card add view  
4. Read one Card (not whole deck)
5. Update Card
6. Update Deck
6. Destroy Card 

## Next time
Using Firebase; write Mood Diary as a proof of concept

---

## 2018 04 18 21:04

author: Wiktor

place: Green Caffè Nero, Rondo Daszyńskiego & Kolejowa

### Today we did

**Card adder**
Finally worked! We can add card to mongoDB via mongoose.

**Code learning**

Chapter 4: Datatypes in JavaScript

function to check if sth. is array
```javascript
Array.isArray([klek, szczek])
true
```

Warning: if you create variable with number starting with `0`, js will return you natural number, so without `0` at the beginning
```javascript
var kodDoKibla = 0494
undefined

kodDoKibla
494
```

`typeof` can be used to check if variable exist and/or has value:
```js
var wiktor
undefined
typeof wiktor
"undefined"
wiktor = 1
1
typeof wiktor
"number"
```

`arguments` as function arguments
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
```js
function func1(a, b, c) {
  console.log(arguments[0]);
  // expected output: 1
```

Operator `new`
[https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Operator_new](Operator new)
```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// expected output: "Eagle"
```

`Array.prototype.sort()`
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort](array sort)




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