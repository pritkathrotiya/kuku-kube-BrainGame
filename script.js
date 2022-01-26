var color;
var nearColor;
var row = 1;
var count=0;
var score=0;
var timer=15;
var divider=1;
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

window.onload= function () {
	create_table(row);
	reduceTimer();
}

function reduceTimer(){
	document.getElementById('timer').innerHTML=timer;
	timer--;
	if(timer<0) {
		$('#myModal').modal('show');
		document.getElementById('score').innerHTML='Your Score Is '+score;
		return;
	};
	setTimeout(reduceTimer,1000);
}

function create_table(row) {
	var id=1;
	var rows = [];
	var colStr = null;
	for(var j = 0; j <= row; j++) {
		colStr = "";
		for (var i = 0; i <= row; i++){
			var cell = '<td id='+id+' class="btnStyle" onclick=" return btnClick(this)"> </td>';
			colStr += cell;
			id++;
		};
		rows.push('<tr>' + colStr + '</tr>');
	}
	document.getElementById('tbl').innerHTML += rows.join("");
	reduceButton();
	fillColor();
}

function btnClick(x) {
	if(rgb2hex(x.style.backgroundColor).toString().toUpperCase()==rgb2hex(color).toString().toUpperCase()){
		return false;
	}
	else{
		document.getElementById('tbl').innerHTML="";
		if(row==10){
			row=10;
		}
		else{
			row++;
		}
		create_table(row);
		timer=15;
		score++;
	}
}

function reduceButton(){
	if(row<10){
		divider=divider+0.2;
	}
	else{
		divider=divider;
	}
	var btn = document.getElementsByTagName('td');
	for(var i=0 ; i<btn.length; i++){
		var temp=(100/divider);
		var temp1=(6/divider);
		btn[i].style.width=temp+'px';
		btn[i].style.height=temp+'px';
		document.getElementById('header').style.marginTop=temp1+'%';
	}
}

function fillColor(){
	var random= Math.floor(Math.random() * ((row+1)*(row+1)))+1;
	var btn = document.getElementsByClassName('btnStyle');

	getRandomColor();

	for(var i=0 ; i<btn.length; i++){
		btn[i].style.backgroundColor=color;
	}

	document.getElementById(random).style.backgroundColor=nearColor;;
}

function getRandomColor() {
	const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
	const r = randomBetween(0, 255);
	const g = randomBetween(0, 255);
	const b = randomBetween(0, 255);

	if(count>=0 && count <5){
		nearColor = `rgb(${r+60},${g+60},${b+60})`;
		count++;
	}
	else if(count>=5 && count<10){
		nearColor = `rgb(${r+30},${g+30},${b+30})`;
		count++;
	}
	else if(count>=10 && count<20){
		nearColor = `rgb(${r+11},${g+11},${b+11})`;
		count++;
	}
	else {
		nearColor=`rgb(${r+5},${g+5},${b+5})`;
		count++;
	}
	color =  `rgb(${r},${g},${b})`;
}

function restart(){
	window.location.reload();
}
