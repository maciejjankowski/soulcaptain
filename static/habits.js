var app = new Vue({
	el: '#habits',
	data: {
		admin: 0,
		loggedIn: 1,
		habits: [],
		habitsEditable: false,
		busy: false
	},


	methods: {
		editableHabits: function () {
			app.habitsEditable ^= 1;
		},
		increaseTimeCount: function (i) {
			app.habits[i].times = Math.min(365.25 * 24, app.habits[i].times + 1);
		},
		decreaseTimeCount: function (i) {
			app.habits[i].times = Math.max(0, app.habits[i].times - 1);
		},
		increaseTimeSpan: function (i) {
			var j = timeSpans.indexOf(app.habits[i].frequency);
			j = Math.min(timeSpans.length - 1, j + 1);
			app.habits[i].frequency = timeSpans[j];
			app.habits[i].f = app.habits[i].frequency.substr(0, 1).toUpperCase();
		},
		decreaseTimeSpan: function (i) {
			var j = timeSpans.indexOf(app.habits[i].frequency);
			j = Math.max(0, j - 1);
			app.habits[i].frequency = timeSpans[j];
			app.habits[i].f = app.habits[i].frequency.substr(0, 1).toUpperCase();
		},
		increaseType: function (i) {
			var j = habitType.indexOf(app.habits[i].type);
			j = Math.min(habitType.length - 1, j + 1);
			app.habits[i].type = habitType[j];
		},
		decreaseType: function (i) {
			var j = habitType.indexOf(app.habits[i].type);
			j = Math.max(0, j - 1);
			app.habits[i].type = habitType[j];
		},
		markDone: function (i) {
			app.habits[i].lastCompleted = Date.now() / 1000;
			updateHabits(app.habits);
		}
	}
});

function send(path, data) {
	app.busy = true;
	return $.ajax({
		method: 'POST',
		url: path,
		data: JSON.stringify({
			'payload': data
		}),
		contentType: 'application/json; charset=utf-8'
	}).then(() => {
		app.busy = false;
	});
}

function updateHabits(habits) {
	send('/habits', habits);
}

var timeSpansLength = [1, 24, 24 * 7, 24 * 30, 24 * 30 * 3 + 1.5, 24 * 30 * 12 + 6, 24 * 30 * 24 + 12];
var timeSpans = ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'bi-annually'];
var habitType = ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
var whenDaily = ['wake-up', 'before breakfast', 'before noon', 'before lunch', 'after work', 'before bed'];
var whenWeekly = ['first day', 'mid-week', 'weekend', 'end of the week'];
var whenWeekly = ['first days', 'mid-month', 'end of the month'];

function timeSpanWeight(timeSpan, times, lastCompleted) {
	const hour = 1 * 60 * 60 * 1000; // msec
	return Date.now() - lastCompleted - (hour * timeSpansLength[timeSpans.indexOf(timeSpan)] / times);
}

function getOccurence() {
	// get('/api/doings/occurence')
	return [{
		doing: {
			'frequency': 'weekly',
			'name': '20 linijek kodu',
			'times': 3,
			'type': 'growth'
		},
		timestamp: -200, // last occurence
		weight: 100 // getWeight(type, frequency, when, ), narazie random * when
	}];
} // getOccurence // getCandidateTask (randomy, żeby sugerować kolejne zadania (powtórzenia, ostatnio robione, pora dnia, rodzaj (maintenance > growth)

var habits = [{
	'frequency': 'weekly',
	'name': 'Pisanie / tworzenie',
	'times': 2,
	'type': 'growth',
},
	{
		'frequency': 'weekly',
		'name': '20 linijek kodu',
		'times': 3,
		'type': 'growth',
		'lastCompleted': -40000

	},
	{
		'frequency': 'monthly',
		'name': 'Assety',
		'times': 2,
		'type': 'growth'
	},
	{
		'frequency': 'weekly',
		'name': 'Nauka',
		'times': 2,
		'type': 'growth'
	},
	{
		'frequency': 'weekly',
		'name': 'Klienci',
		'times': 1,
		'type': 'growth'
	},
	{
		'frequency': 'weekly',
		'name': 'Ćwiczenia',
		'times': 2,
		'type': 'sustain'
	},
	{
		'frequency': 'weekly',
		'name': 'Sauna',
		'times': 1,
		'type': 'sustain'
	},
	{
		'frequency': 'daily',
		'name': 'Wyciszanie / relaks / medytacje / drzemki',
		'times': 1,
		'type': 'sustain'
	},
	{
		'frequency': 'weekly',
		'name': 'Wstawanie przed 7',
		'times': 2,
		'type': 'sustain'
	},
	{
		'frequency': 'weekly',
		'name': 'Wyjść z domu przed 8',
		'times': 2,
		'type': 'sustain'
	},
	{
		'frequency': 'weekly',
		'name': 'Sexy time',
		'times': 1,
		'type': 'sustain'
	},
	{
		'frequency': 'daily',
		'name': 'Plan na następny dzień',
		'times': 1,
		'type': 'sustain',
		'when': 'before bed'
	},
	{
		'frequency': 'monthly',
		'name': 'Mitapy / eventy / znajomi',
		'times': 2,
		'type': 'excite'
	},
	{
		'frequency': 'monthly',
		'name': 'Bycie docenionym / użycie talentu',
		'times': 1,
		'type': 'excite'
	},
	{
		'frequency': 'monthly',
		'name': 'Zwycięstwa',
		'times': 1,
		'type': 'excite'
	},
	{
		'frequency': 'monthly',
		'name': 'Wyzwania / przekraczanie granic',
		'times': 1,
		'type': 'excite'
	},
	{
		'frequency': 'weekly',
		'name': 'Gotowanie',
		'times': 3,
		'type': 'maintenance'
	},
	{
		'frequency': 'weekly',
		'name': 'Sprzątanie',
		'times': 1,
		'type': 'maintenance'
	},
	{
		'frequency': 'daily',
		'name': 'Budżet / Wydatki',
		'times': 1,
		'type': 'maintenance'
	},
	{
		'frequency': 'monthly',
		'name': 'Głodówka',
		'times': 2,
		'type': 'challenge'
	},
	{
		'frequency': 'weekly',
		'name': 'Dzień bez wydatków',
		'times': 2,
		'type': 'challenge'
	},
	{
		'frequency': 'weekly',
		'name': 'Dzień bez fb',
		'times': 2,
		'type': 'challenge'
	},
	{
		'frequency': 'weekly',
		'name': 'Dzień bez mięsa',
		'times': 4,
		'type': 'challenge'
	},
	{
		'frequency': 'weekly',
		'name': 'Dzień bez cukru',
		'times': 5,
		'type': 'challenge'
	}
];

habits.forEach((i) => {
	i.f = i.frequency.substr(0, 1).toUpperCase(), i.lastCompleted = Date.now() / 1000;
});

app.habits = habits;