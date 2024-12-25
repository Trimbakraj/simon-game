let buttonColors = ["red", "blue", "green", "yellow"]; 

let gamePattern = [];
let userClickedpattern = [];

let level=0;
let started=false;


$(document).keypress(function(){
    
    if(!started){
       level=0;
        $('#level-title').text("Level "+level);
        nextSequence(); 
        started=true;
    } 
    
});



$(".btn").click(function () {  

    if (!started) {
        return; // Ignore clicks if the game hasn't started
    }

    let userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor); 

    playSound(userChosenColor); 
    animatePress(userChosenColor); 

    checkAnswer(userClickedpattern.length-1);

});

function animatePress(currentColor) {
 
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);  

} 

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function nextSequence() { 

    userClickedpattern = [];
    level++;  
    console.log(level);

    $('#level-title').text("Level "+level); 
    
    let randomNumber = Math.floor(Math.random() * 4); //0-3
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

    playSound(randomChosenColor);
} 



function checkAnswer(currentLevel){
    
    if(userClickedpattern[currentLevel]==gamePattern[currentLevel]){
    console.log("Success");  
     
      if(userClickedpattern.length==gamePattern.length){
           setTimeout(function(){
            nextSequence();
           },1000);
      }


    } 
    else{
        console.log("Wrong");  
        playSound("wrong"); 

        $("body").addClass("game-over"); 

        setTimeout(function(){
           $("body").removeClass("game-over");   
        },200); 

        $("#level-title").text("Game Over, Press Any Key to Restart"); 

        startOver();
        
    }
} 


function startOver(){
    level=0;  
    gamePattern=[];  
    started=false;
}
