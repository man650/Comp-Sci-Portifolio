//The computer can choose number from 1-4 and this number that gets chosen will have poison in it 
var computerChoice = Math.floor(Math.random() * 4) + 1;


//The submitbutton are the bottles that you have to click on to see if it has poison
var submitButton1 = document.getElementById("submitButton1");
var submitButton2 = document.getElementById("submitButton2");
var submitButton3 = document.getElementById("submitButton3");
var submitButton4 = document.getElementById("submitButton4");

//The computer will chose a number and that number will have poison in it and if that person clicks on it, the deadroulette html will pop up and say that he died.
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