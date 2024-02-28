var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function (event) {
    if (!started) {
        started = true;
        $("h1").text("level " + level);
        nextSequence();
    }

});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animation(userChosenColour);
    checkanswer(userClickedPattern.length - 1);
});
function checkanswer(index) {
    if (userClickedPattern[index] == gamePattern[index]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any to restart");
        restart();

    }
}
function nextSequence() {
    level++;
    $("h1").text("level " + level);
    userClickedPattern = [];
    var a = Math.random();
    a = a * 4;
    var randomNumber = Math.floor(a);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var color_id = "#" + randomChosenColour;
    $(color_id).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animation(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}
function restart() {
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
    started=false;
}