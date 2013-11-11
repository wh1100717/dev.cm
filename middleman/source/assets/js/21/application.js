var LEAP, NEXT, SL;
var TZoffset, LocalClock, Start, Timer;
var Offset, Offset0, Offset1;

var JSToffset = 9 * 3600000;  // JST = UTC + 9H
var Nservers = 0, Prev = 99, Loopcount = 20;
var Jdisable = 0, Interval = 100;  // Refresh every 100ms

var Server = new Array();

var xday = {
	year: 2013,
	mon: 12,
	day: 5,
	time: 19
},
	xdatetime = new Date(xday.year, xday.mon-1, xday.day, xday.time, 00, 00);


var Text = [
	"<h2>サーバからの時刻取得に失敗しました。<\/h2><h3>少し時間がたってから再読み込みしてください。<\/h3>",
	"<h3>一部のサーバからの時刻取得に失敗しました。<\/h3><h3>不正確な時刻が表示されている可能性があります。<\/h3>",
	"合っています",
	" 秒 進んでいます",
	" 秒 遅れています",
	"<h3>時刻取得結果<\/h3>",
	"取得した時刻の誤差は、上記 RTT ＋ 処理系の誤差（通常 30ms 程度）に収まると考えられます｡<br>"
];

var cntDays = document.getElementById('days'),
	cntHours = document.getElementById('hours'),
	cntMinutes = document.getElementById('minutes'),
	cntSeconds = document.getElementById('seconds');

function jsont(json) {
	if( Jdisable ) return;
	var now = new Date();
	if( json["st"] == null || json["it"] == null ) return;
	if( json["leap"] == null || json["next"] == null ) return;
	json["rt"] = now.getTime() / 1000;  // Record Receive time
	Server.push( json );
}

function addscript(url) {  // Dynamic loading of JSONP script
	var now = new Date();  // Record Initiation time
	var script     = document.createElement('script'); 
	script.charset = 'UTF-8';
	script.src     = url + "?" + ( now.getTime() / 1000 );
	Nservers++;  // Number of servers
	document.getElementsByTagName('body')[0].appendChild(script);
}

function startclock() {
	addscript( "http://ntp-a1.nict.go.jp/cgi-bin/jsont" );
	addscript( "http://ntp-b1.nict.go.jp/cgi-bin/jsont" );
	startc();
}

// function stopclock() {
// 	if ( Timer != null ) clearInterval(Timer);
// }

function errmsg(msgnum) {
	var msgbox;
	msgbox = document.getElementById( "ServerStat" );
	if ( null != msgbox )  msgbox.innerHTML = Text[msgnum];
}

function showmsg() {
	var msgbox,
		msg;

	if( Server.length > 0 ) {
		msg = 'server0: ' + Server[0]["id"] + ' , RTT = ' +
			Math.floor( 1000 * (Server[0]["rt"] - Server[0]["it"]) ) +
			' ms , (PC Clock - JST) = ' + Math.floor( - Offset0 ) + ' ms<br>';
	}
	else msg = 'server0: unavailable<br>';

	if( Server.length > 1 ) {
		msg += 'server1: ' + Server[1]["id"] + ' , RTT = ' +
			Math.floor( 1000 * (Server[1]["rt"] - Server[1]["it"]) ) +
			' ms , (PC Clock - JST) = ' + Math.floor( - Offset1 ) + ' ms<br>';
	}
	else msg += 'server1: unavailable<br>';

	msgbox = document.getElementById( "ServerStat" );
	if ( null != msgbox ) msgbox.innerHTML = Text[5] + msg + Text[6];
}

function startc() {

	if ( ( Server.length < Nservers ) && ( Loopcount-- > 0 ) ) {
		setTimeout("startc()",100);
		return;
	}
	Jdisable = 1; // No more return packets will be processed

	if ( Server.length == 0 ) {
		errmsg( 0 );
		return;
	}

	Offset0 = 1000 * Server[0]["st"] - 500 * Server[0]["it"] - 500 * Server[0]["rt"];
	Offset = Offset0;

	if ( Server.length >= 2 ) {
		Offset1 = 1000 * Server[1]["st"] - 500 * Server[1]["it"] - 500 * Server[1]["rt"];
		if( Math.abs( Offset0 - Offset1 ) < 200 ) {
			Offset = ( Offset0 + Offset1 ) / 2;
		} else {
			Server.pop();
		}
	}
	if ( Server.length == 1 ) errmsg( 1 );

	LEAP = Server[0]["leap"];  // Total leap seconds before NEXT Leap
	NEXT = Server[0]["next"];  // Next Leap (UNIX TIME)

	LocalClock = new Date();
	Start = Math.floor( ( Offset + LocalClock.getTime() ) / 1000 );

	TZoffset = LocalClock.getTimezoneOffset() * 60000;
	if (TZoffset > 12 * 3600000) TZoffset -= ( 24 * 3600000 );

	SL = LEAP;
	if ( Start >= NEXT ) SL = SL + 1;	// TAI - UTC at startup

	Timer = setInterval("showtime()", Interval);
}

// function ToDateStr(t, flg) {
// 	var h, m, s, YY, MM, DD;

// 	h = t.getUTCHours();
// 	m = t.getUTCMinutes();
// 	s = t.getUTCSeconds();
// 	if ( flg != 0 ) s = 60;

// 	if (h < 10) h = "0" + h;
// 	if (m < 10) m = "0" + m;
// 	if (s < 10) s = "0" + s;

// 	YY = t.getUTCFullYear();
// 	MM = t.getUTCMonth() + 1;
// 	DD = t.getUTCDate();
// 	if (MM < 10) MM = "0" + MM;
// 	if (DD < 10) DD = "0" + DD;

// 	return (YY + "/" + MM + "/" + DD + " " + h + ":" + m + ":" + s);
// }

function ToXDateStr(JST) {
	var passtime,
		cnts = {
			cnt_day: 0,
			cnt_hour: 0,
			cnt_min: 0,
			cnt_sec: 0
		}
	passtime = xdatetime.getTime() - JST.getTime();

	cnts.cnt_day = Math.floor(passtime / (1000*60*60*24));
	passtime -= cnts.cnt_day * (1000*60*60*24);

	cnts.cnt_hour = Math.floor(passtime / (1000*60*60));
	passtime -= cnts.cnt_hour * (1000*60*60);
	
	cnts.cnt_min = Math.floor(passtime / (1000*60));
	passtime -= cnts.cnt_min * (1000*60);
	
	cnts.cnt_sec = Math.floor(passtime / 1000);

	if(cnts.cnt_min<10) cnts.cnt_min = '0' + cnts.cnt_min;
	if(cnts.cnt_sec<10) cnts.cnt_sec = '0' + cnts.cnt_sec;

	return cnts;
}

function showtime() {
	var now, flg, temp, sec, utcms, utcsec;
	var JST, UTC, TAI, LOC, CMP, CL;

	now = new Date();
	utcms = now.getTime() + Offset + Interval / 2;
	utcsec = Math.floor( utcms / 1000 );

	CL = LEAP;
	if ( utcsec >= NEXT ) CL = CL + 1;	// Current TAI - UTC
	temp = utcms - ( CL - SL ) * 1000;

	// flg = 0;
	// if ( utcsec == NEXT ) flg = 1;

	JST = new Date( temp + JSToffset );
	// printJST.innerHTML = ToDateStr(JST, flg);

	var cnts = ToXDateStr(JST);
	cntDays.innerHTML = cnts.cnt_day;
	cntHours.innerHTML = cnts.cnt_hour;
	cntMinutes.innerHTML = cnts.cnt_min;
	cntSeconds.innerHTML = cnts.cnt_sec;
}

startclock();