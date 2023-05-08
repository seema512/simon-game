var colors = ["blue", "green", "yellow", "red"];
var gamePattern = [];
var userclickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(keyboardEvent){
    if(!started){
        $("#level-title").text("level "+level);
        randomFlashAndSound();
        started = true;
    }
});

function randomFlashAndSound(){
    userclickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

var randomNumber = Math.round((Math.random()*3));
var chosenColor = colors[randomNumber];
gamePattern.push(chosenColor);

$("#"+chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
// var audio = new Audio(chosenColor+".mp3");
// audio.play();
playSound(chosenColor);
}


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userclickedPattern.push(userChosenColor);
    console.log(userclickedPattern);
    // var playSound = new Audio(userChosenColor+".mp3");
    // playSound.play();
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userclickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        }, 100); 
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userclickedPattern[currentLevel]) {
        console.log("success");
        if (userclickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                randomFlashAndSound();
            }, 1000);

        }
    } else {

        // console.log("wrong");
        playSound("wrong");
        setTimeout(function () {
            $("body").addClass("game-over");
        }, 200);
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 400);
        $("h1").text("Game over, press any key to restart");
        startOver();
        

    }
}

function startOver(){
   
    level = 0;
    gamePattern = [];
    started = false;
    
}


