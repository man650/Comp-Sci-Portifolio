var Bot = require('bot');
var PF = require('pathfinding');
// var bot = new Bot('gsheq30z', 'training', 'http://vindinium.org'); //Put your bot's code here and change training to Arena when you want to fight others.
var bot = new Bot('a5309451', 'arena', 'http://52.8.116.125:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////
        /*                                      * 
         * This Code is global data!            *
         *                                      */
        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir;
        //
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        //
        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);
        
        // 
        var lowestHealthIndex = 0;
        for(i = 0; i < bot.enemyBots.length; i++) {
            if(enemyBots[lowestHealthIndex].life > enemyBots[i].life) {
                lowestHealthIndex = i;
            }
            //myDir = bot.findPath(myPos, [enemyBots[lowestHealthIndex].pos.x, enemyBots[lowestHealthIndex].pos.y]);
        }
        
        //
        var mostMinesIndex = 0;
        for(i = 0; i < bot.enemyBots.length; i++) {
            if(enemyBots[mostMinesIndex].mineCount > enemyBots[i].minesCount) {
                mostMinesIndex = i;
            }
            //myDir = bot.findPath(myPos, [enemyBots[lowestHealthIndex].pos.x, enemyBots[lowestHealthIndex].pos.y]);
        }
        
       
        /*                                      * 
         * This Code Decides WHAT to do         *
         *                                      */
       
        var task;
        //
        if(bot.yourBot.life < 40) {
            task = "go to tavern"
        }
        //
        else if(enemyBots[mostMinesIndex].life < bot.yourBot.life && bot.findDistance(myPos, [enemyBots[mostMinesIndex].pos.x, enemyBots[mostMinesIndex].pos.y]) < 5) {
            task = "attack mostMines"
            
        }
        //
        else {
            task = "mines";
        }
        
        /*                                      * 
         * This Code Determines HOW to do it    *
         *                                      */
        
        // 
        if(task === "attack mostMines"){
            console.log("attacking the enemy");
            myDir = bot.findPath(myPos, [enemyBots[mostMinesIndex].pos.x, enemyBots[mostMinesIndex].pos.y]); 
        }
        
        // This Code find the nearest freemine and sets myDir toward that direction // 
        if(task === "mines") {
            var closestMine = bot.freeMines[0];
            for(i = 0; i < bot.freeMines.length; i++) {
                if(bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                    closestMine = bot.freeMines[i];
                }
            }
            console.log("Claiming a Free Mine!");
            myDir = bot.findPath(myPos, closestMine);
        }
        //
        if(task === "go to tavern") {
            var closestTavern = bot.taverns[0];
            for(i = 0; i < bot.taverns.length; i++) {
                if(bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                    closestTavern = bot.taverns[i];
                }
            }
            console.log("getting my health up!");
            myDir = bot.findPath(myPos, closestTavern);
        }
        /*                                                                                                                              * 
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */
       //
        if(myDir === "none") {
            console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            bot.goDir = dirs[rand];
        } else {
            bot.goDir = myDir;
        }
        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();