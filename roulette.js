//
var computerChoice = Math.floor(Math.random() * 4) + 1;


//
var submitButton1 = document.getElementById("submitButton1");
var submitButton2 = document.getElementById("submitButton2");
var submitButton3 = document.getElementById("submitButton3");
var submitButton4 = document.getElementById("submitButton4");

//
if (computerChoice === 1) {
    submitButton1.onclick = function() {window.location.replace("deadroulette.html")};
}     
if (computerChoice === 2) {
    submitButton2.onclick = function() {window.location.replace("deadroulette.html")};
}
if (computerChoice === 3) {
    submitButton3.onclick = function() {window.location.replace("deadroulette.html")};
}      
if (computerChoice === 4) {
    submitButton4.onclick = function() {window.location.replace("deadroulette.html")};
}