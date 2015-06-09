
var bart = document.getElementById("bart");
var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;

var ghost = new Ghost(60,80);
var ghostUp = false;
var ghostDown = false;
var ghostLeft = false;
var ghostRight = false;

var coins = [];

function Coin(x,y){
    this.x = x;
    this.y = y;
    this.elem = document.createElement("div");
    this.elem.style.position = "absolute"
    this.elem.style.width="25px"
    this.elem.style.height="25px"
    this.elem.className = "coins";
    this.elem.style.left= this.x + "px"
    this.elem.style.top = this.y + "px";
//     this.elem.style.backgroundColor ="blue" 
    document.body.appendChild(this.elem); 
    this.remove = function(){
        this.elem.parentNode.removeChild(this.elem);
    }
}


function Ghost(x,y){
    this.x = x;
    this.y = y;
    this.elem = document.createElement("div");
    this.elem.style.position = "absolute"
    this.elem.style.width="25px"
    this.elem.style.height="25px"
    this.elem.className = "ghost";
    this.elem.style.left= this.x + "px"
    this.elem.style.top = this.y + "px";
//     this.elem.style.backgroundColor ="purple" 
    document.body.appendChild(this.elem); 
}

 




for(i=10; i<5000; i+=50){
    coins.push(new Coin(i, 200));
}



for(i=10; i<2000; i+=50){
    coins.push(new Coin(i, 50));
}


window.addEventListener("keydown", pressdownkey);
function pressdownkey(evt){
    //This moves the pacman
    if(evt.keyCode === 87) { 
        goingUp = true;
    }
    
    if(evt.keyCode === 83) {
        goingDown = true
    }
    if(evt.keyCode === 68) {
        goingRight = true
    }
    if(evt.keyCode === 65) {
        goingLeft = true
    }  
    
    // This moves the ghost
    if(evt.keyCode === 38) { 
        ghostUp = true;
    }
     if(evt.keyCode === 40) {
        ghostDown = true
    }
    if(evt.keyCode === 39) {
        ghostRight = true
    }
    if(evt.keyCode === 37) {
        ghostLeft = true
    }      
    
}

window.addEventListener("keyup", releasekey);
function releasekey(evt){
    if(evt.keyCode === 87) { 
        goingUp = false;
    }
    
    if(evt.keyCode === 83) {
        goingDown = false
    }
    if(evt.keyCode === 68) {
        goingRight = false
    }
    if(evt.keyCode === 65) {
        goingLeft = false
    }  

    // This moves the ghost
    if(evt.keyCode === 38) { 
        ghostUp = false;
    }
     if(evt.keyCode === 40) {
        ghostDown = false
    }
    if(evt.keyCode === 39) {
        ghostRight = false
    }
    if(evt.keyCode === 37) {
        ghostLeft = false
    }      
}
    

function moveBart(){
    if (goingDown === true) {
        bart.style.top = parseInt(bart.style.top) + 5 + "px";
    }
    if (goingLeft === true) {
        bart.style.left = parseInt(bart.style.left) - 5 + "px";
    }
    if (goingRight === true) {
        bart.style.left = parseInt(bart.style.left) + 5 + "px";
    }
    if (goingUp === true) {
        bart.style.top = parseInt(bart.style.top) - 5 + "px";
    }    
}


function moveGhost(){
    if (ghostDown === true) {
        ghost.elem.style.top = parseInt(ghost.elem.style.top) + 5 + "px";
    }
    if (ghostLeft === true) {
        ghost.elem.style.left = parseInt(ghost.elem.style.left) - 5 + "px";
    }
    if (ghostRight === true) {
        ghost.elem.style.left = parseInt(ghost.elem.style.left) + 5 + "px";
    }
    if (ghostUp === true) {
        ghost.elem.style.top = parseInt(ghost.elem.style.top) - 5 + "px";
    }    
}
    

function isColliding(thi1, thi2){
    var above = parseInt(thi1.style.top) + parseInt(thi1.style.height) < parseInt(thi2.style.top)
    var below = parseInt(thi2.style.top) + parseInt(thi2.style.height) < parseInt(thi1.style.top)
    var rightOf = parseInt(thi1.style.left) > parseInt(thi2.style.width) + parseInt(thi2.style.left) 
    var leftOf = parseInt(thi1.style.left) + parseInt(thi1.style.width) < parseInt(thi2.style.left)    
    
    if(above || below || rightOf || leftOf) return false;
    else return true;
}





    //javascript:void(0)
function gameLoop(){
    moveBart();
    moveGhost();
    //ghost hits pacman
    if(isColliding(bart,ghost.elem)){
        alert("Ghost wins")
    }
    
    
    
    //pacman eats coins 
    for(i = 0; i < coins.length; i++){
        if(isColliding(bart, coins[i].elem)){
            coins[i].remove();
                coins.splice(i, 1);
        }
    }
    
    window.requestAnimationFrame(gameLoop);
} 
gameLoop();












