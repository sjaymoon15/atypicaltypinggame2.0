var timer = 3200;
var fallSpd = 15100;
var score = 0;
var life = 10;
var wdth = screen.width - 100;
wdthpx = wdth + "px";
var hght = screen.height - 150;
hghtpx = hght + "px";
var level = 1;

$(document).ready(function(){ 
  //start Game function here
  $("#words").focus();
  
  $("#site").css(
  {
    "width": wdthpx,
    "height": hghtpx
  });
  
  window.setInterval(function(){
      fallingWord();
  }, timer);
  match();
  
});

// words Falling
//try to use random word api here.
function fallingWord() {

    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        len: 5,
        // jsonpCallback: 'RandomWordComplete',
        success: function(data){
          var ranWord = data.Word;
          var wordFall = $('<div class="fallingWords" text="'+ranWord+'">'+ ranWord +'</div>');
          console.log(typeof(wordFall));
          $('#fallingZone').append(wordFall);
          
          fallX = Math.floor(Math.random() * ($('#site').width()*0.5));
  
          wordFall.css({'left':fallX+'px'});
          wordFall.animate({
              top: hght
            }, fallSpd, "linear", function(){ 
              var position = wordFall.position();
              var topPos = position.top;
              // console.log(position.top);
              // console.log(hght);
              if(topPos === hght){
                life -= 1;
                explosionSound();
                $("#life").html(life);
                $(this).remove();
                endGame(life);
              }
              
          });

        }

    });

  
  // var wordsArr = ["cool","ssup", "page","chill","website", "play","coffee","java","python","terminal","computer","dev","front", "back","html", "css", "js", "random", "words", "work", "nice", "good", "hey", "yo", "super","interest"];
  //randomly chosen word
  // var ranWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

}

function match() {
  $("#button").on("click", function(){
      
    var typedWord = $("#words").val();
    console.log(typedWord);
    var fallingWord = $("[text="+typedWord+"]"); 
    
    if(fallingWord.text() === typedWord ){
      // console.log("---")
      // console.log(fallingWord.text());
      fallingWord.remove();
      $('#words').val("");
      score += 1; //Thanks Ian. 
      $('#score').html(score);  
      bonusSound()
      speedControl(score);
    }else{
      $('#words').val("");
    }
  });
    
  //click buttton by pressing Enter key.
  $("#words").keydown(function(event){
    if(event.keyCode == 13){
      $("#button").click();
    }
  });   
};

function speedControl(num){
  var nArr = [5, 10, 15, 20, 25];
  var colorArr = ["#81F7F3", "#2E9AFE", "#F781F3", "#FA5882" ,"#000000" ];

  for(var i = 0; i < nArr.length; i++){
    if(num === nArr[i]){
      level += 1;
      $('#level').html(level);
      fallSpd -= 3000;
      timer -= 600;
      $("body").css("background-color", colorArr[i]);
      shootSound();
    }
  }

  // if(num === 5){
  //   console.log("score5")
  //   level += 1; 
  //   $('#level').html(level); 
  //   fallSpd = 8000;
  //   timer = 1000;
  //   $("body").css("background-color", "#81F7F3");
  //   shootSound();
  // }else if(num === 10){
  //   console.log("score10")
  //   level += 1; 
  //   shootSound();
  //   $('#level').html(level); 
  //   fallSpd = 5000;
  //   timer = 500;
  //   $("body").css("background-color", "#2E9AFE");
    
  // }else if(num === 15){
  //   console.log("score15")
  //   level += 1;  
  //   shootSound();
  //   $('#level').html(level); 
  //   fallSpd = 3000;
  //   timer = 200;
  //   $("body").css("background-color", "#F781F3");
  // }else if(num === 20){
  //   level += 1;  
  //   shootSound();
  //   $('#level').html(level); 
  //   fallSpd = 1000;
  //   timer = 50;
  //   $("body").css("background-color", "#FA5882");
  // }
}
function endGame(nLife){
  // console.log(nLife);
  // console.log(score);
  if(nLife === 0){ 
    $(".finishScreen").css("display", "");
    $('.finishScreen').toggleClass("finishScreenAdded");
    $(".container").hide();
    $("#finalScore").html(score);
    $("#startAgain").on("click", function(){
      location.reload();
    })
  }
};

//playing with sound effect from here
// var i = keyboard(73),
//     j = keyboard(74),
//     k = keyboard(75),
//     l = keyboard(76);

// i.press = function(){ shootSound() };
// j.press = function(){ jumpSound() };
// k.press = function(){ explosionSound() };
// l.press = function(){ bonusSound() };

//The sound effect functions

//The shoot sound
function shootSound() {
  soundEffect(
    1046.5,           //frequency
    0,                //attack
    0.3,              //decay
    "sawtooth",       //waveform
    1,                //Volume
    -0.8,             //pan
    0,                //wait before playing
    1200,             //pitch bend amount
    false,            //reverse bend
    0,                //random pitch range
    25,               //dissonance
    [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
    undefined         //reverb: [duration, decay, reverse?]
  );
}

//The jump sound
function jumpSound() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo: [delay, feedback, filter]
    undefined     //reverb: [duration, decay, reverse?]
  );
}

//The explosion sound
function explosionSound() {
  soundEffect(
    16,          //frequency
    0,           //attack
    1,           //decay
    "sawtooth",  //waveform
    1,           //volume
    0,           //pan
    0,           //wait before playing
    0,           //pitch bend amount
    false,       //reverse
    0,           //random pitch range
    50,          //dissonance
    undefined,   //echo: [delay, feedback, filter]
    undefined    //reverb: [duration, decay, reverse?]
  );
}

//The bonus points sound
function bonusSound() {
  //D
  soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
  //A
  soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
  //High D
  soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
}



















