var Timer;
var Interval = 100;  // Refresh every 100ms

var xday = {
	year: 2013,
	mon: 11,
	day: 12,
	time: 19
},
	xdatetime = new Date(xday.year, xday.mon-1, xday.day, xday.time, 00, 00),
	cnts = {
		cnt_day: 0,
		cnt_hour: 0,
		cnt_min: 0,
		cnt_sec: 0
	};

var cntDays = document.getElementById('days'),
	cntHours = document.getElementById('hours'),
	cntMinutes = document.getElementById('minutes'),
	cntSeconds = document.getElementById('seconds');

function startclock() {
	startc();
}

function stopclock() {
	if ( Timer != null ) {
		clearInterval(Timer);
		cnts.cnt_day = '00';
		cnts.cnt_hour = '00';
		cnts.cnt_min = '00';
		cnts.cnt_sec = '00';
		showtime(cnts);
	}
}

function startc() {
	Timer = setInterval("countdown()", Interval);
}

function ToXDateStr(JST) {
	var passtime = xdatetime.getTime() - JST.getTime();

	cnts.cnt_day = Math.floor(passtime / (1000*60*60*24));
	passtime -= cnts.cnt_day * (1000*60*60*24);

	cnts.cnt_hour = Math.floor(passtime / (1000*60*60));
	passtime -= cnts.cnt_hour * (1000*60*60);
	if ((cnts.cnt_hour == 0) && (passtime >= (1000*60))) {
		cnts.cnt_hour = 23;
	}
	
	cnts.cnt_min = Math.floor(passtime / (1000*60));
	passtime -= cnts.cnt_min * (1000*60);
	
	cnts.cnt_sec = Math.floor(passtime / 1000);

	if(cnts.cnt_min<10) cnts.cnt_min = '0' + cnts.cnt_min;
	if(cnts.cnt_sec<10) cnts.cnt_sec = '0' + cnts.cnt_sec;

	return cnts;
}

function countdown() {
	var JST, UTC, TAI, LOC, CMP, CL;
	JST = new Date();

	if (JST >= xdatetime) {
		stopclock();
		return;
	}

	var cnts = ToXDateStr(JST);
	showtime(cnts);
}

function showtime(cnts) {
	cntDays.innerHTML = cnts.cnt_day;
	cntHours.innerHTML = cnts.cnt_hour;
	cntMinutes.innerHTML = cnts.cnt_min;
	cntSeconds.innerHTML = cnts.cnt_sec;
}

startclock();