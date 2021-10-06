var colorArr = ["red", "blue", "green", "yellow"];
var gamePattern=[];

var userClickedPattern=[];
var started=false;

var level=0;

$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    addAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});
    
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);
  var randNum = Math.floor(Math.random() * 4);
  var randomColor = colorArr[randNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playsound(randomColor);
}

function playsound(name){

    var audio = new Audio(name+".mp3");
    audio.play();


}
function addAnimation(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
  function startOver(){

    gamePattern=[];
    level=0;
    started=false;

}