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
        //Set mypos finds the position of where your bot is  
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        // It finds the id number of your bot and the other bot id numbers will be the enemy bots array     
        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);
        
        // It goes through all the enemy bots and Index numbers start from 0 and they add up 1 and it finds the enemy with the lowest health.  
        var lowestHealthIndex = 0;num
        for(i = 0; i < bot.enemyBots.length; i++) {
            if(enemyBots[lowestHealthIndex].life > enemyBots[i].life) {
                lowestHealthIndex = i;
            }
            //myDir = bot.findPath(myPos, [enemyBots[lowestHealthIndex].pos.x, enemyBots[lowestHealthIndex].pos.y]);
        } 
        
        // It goes through all the enemy bots and it looks for the enemy with the most gold mines
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
        //If your bot's health is lower than 40 it will go for a tavern so he can get his health up.
        if(bot.yourBot.life < 40) { 
            task = "go to tavern"
        }
        //My bot is going to attack the person with the most gold mines. 
        else if(enemyBots[mostMinesIndex].life < bot.yourBot.life && bot.findDistance(myPos, [enemyBots[mostMinesIndex].pos.x, enemyBots[mostMinesIndex].pos.y]) < 5) {
            task = "attack mostMines"
            
            
        }
        //The bot's task to get a gold mine
        else {
            task = "mines";
        }
        
        /*                                      * 
         * This Code Determines HOW to do it    *
         *                                      */
        
        //When my bot's task is to find the bot with the most gold mines, he is going to attack him and he is going to in a path and direction to attack him 
        if(task === "attack mostMines"){
            console.log("attacking the enemy");
            myDir = bot.findPath(myPos, [enemyBots[mostMinesIndex].pos.x, enemyBots[mostMinesIndex].pos.y]); 
        }
        
        // This Code find the nearest freemine and sets myDir toward that direction // 
        // My bot's task is to get gold mines and he will get any gold mines that are the closest to him.
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
        //My bot's task is to go to tavern when he has less than 40 health and he is going for the closest tavern
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
        //If he doens't have a direction set, he will go randome
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