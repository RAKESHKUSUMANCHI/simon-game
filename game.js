var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var n=0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("h1").text("level "+n);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(index){
  if(gamePattern[index]===userClickedPattern[index]){
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function(){
        nextSequence();
      },1000);

    }
  }
  else{
  playSound("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}

function nextSequence() {

  n++;
  $("h1").text("level "+n);

  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound("sounds/" + randomChosenColour + ".mp3");

}

function playSound(music){
  var audio = new Audio(music);
  audio.play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");

  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
function startOver(){
  userClickedPattern=[];
  gamePattern=[];
  n=0;
  started=false;
}
