


// ALL GLOBAL VARIABLES
//background & sound
let bg;
let isPlaying = false;
let gameOverSound;
let gameOverSoundTrigger=false;
let MenuSound;
let microSound;
let startSound;


let games = ["minigame1","minigame2","minigame3","minigame4","minigame5","minigame6"]
let marsh1,marsh2,marsh3,marsh4,marsh5,marsh6,marsh7,marsh8,marsh9,marsh10;
let smore1,smore2,smore3,smore4,smore5,smore6,smore7,smore8,smore9,smore10;
let marshScore;
let index=0;
let smoresIndex=0;
let gameState="startScreen";
let cookMarsh;//cook minigame3
let minibar;
//minigame 2
let countdown = 5;
let gameOver = false;
let win = false;
let mashing = 0;

//minigame 5 
let xpos = 200;
let ypos = 30;
let xspeed = 10;
let yspeed = 0;
let falling = false;
let resultShown = false;

//minigame 6
let xChocolate = 90;



//transition 
let transitionStartTime = 0;
let transitionDuration = 1000;  // in milliseconds (1 second)

function preload(){
  bg  = loadImage ("assets/nightbg.png");
  marsh1 = loadImage("assets/Marsh1.png");
  marsh2 = loadImage("assets/Marsh2.png");
  marsh3 = loadImage("assets/Marsh3.png");
  marsh4 = loadImage("assets/Marsh4.png");
  marsh5 = loadImage("assets/Marsh5.png");
  marsh6 = loadImage("assets/Marsh6.png");
  marsh7 = loadImage("assets/Marsh7.png");
  marsh8 = loadImage("assets/Marsh8.png");
  marsh9 = loadImage("assets/Marsh9.png");
  marsh10 = loadImage("assets/Marsh10.png");
  marshScore = [marsh1,marsh2,marsh3,marsh4,marsh5,marsh6,marsh7,marsh8,marsh9,marsh10]

  smore1= loadImage("assets/smore1.png")
  smore2=loadImage("assets/smores2.png")
  smore3=loadImage("assets/smores3.png")
  smore4=loadImage("assets/smores4.png")
  smore5=loadImage("assets/smores5.png")
  smore6=loadImage("assets/smores6.png")
  smore7=loadImage("assets/smores7.png")
  smore8=loadImage("assets/smores8.png")
  smore9=loadImage("assets/smores8.png")
  smore10=loadImage("assets/smores10.png")
  smoreScore = [smore1,smore2,smore3,smore4,smore5,smore6,smore7,smore8,smore9,smore10]

  //sound assets
  MenuSound = loadSound("marsh_sound/menu.mp3")
  microSound = loadSound("marsh_sound/micro.mp3")
  startSound = loadSound("marsh_sound/start.mp3")
  gameOverSound = loadSound("marsh_sound/game_over.mp3")

}

function setup() {
  let canvas = createCanvas(900,900);
  
  canvas.parent("Marshmallow") 
  textAlign(CENTER, CENTER);
  textSize(32);
  frameRate(30);

  
  // startNextGame();  // pick the first game


}

function draw() {
  background(255);
  imageMode(CENTER,CENTER);
  image(bg,width/2,height/2);

  if (gameState ==="startScreen"){
    startScreen();

    if (keyIsPressed){
     startTransition();
    }
  }

  if(gameState==="minigame1"){

    
    minibar.bounce();
    minibar.show();
    minibar.update();
    minibar.drawText();
    text(countdown, width/2, 50);
    
    if (!gameOver) {
      if (frameCount % 30 === 0 && countdown > 0) {
        countdown--;
      }
    }
    
    if (countdown===0){
      gameState="endscreen"
    }
    if (minibar.hit > 0){

      startTransition();

      index = (index +1) % marshScore.length;
      smoresIndex = (smoresIndex +1) % smoreScore.length;
      return; // skip rest of draw this frame
    } else if(minibar.miss > 0){
      gameState = "endscreen";
    }
    
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
  }
  else if (gameState==="minigame2"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    image(bg,width/2,height/2);
    minigame2();
  }
  else if(gameState === "minigame3"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    minigame3();
  }
  else if(gameState==="minigame4"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    minigame4();
  }
  else if(gameState==="minigame5"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    minigame5();
  }
  else if(gameState==="minigame6"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    minigame6();
  }
else if (gameState==="endscreen"){
  if(gameOverSoundTrigger ===false){
    
  if(!gameOverSound.isPlaying()&&gameOverSound.isLoaded()){
    gameOverSound.play();
    microSound.stop();
    MenuSound.stop();
    startSound.stop(); 
  }
  gameOverSoundTrigger=true;
}
  endScreens();

  
}
// —— TRANSITION STATE ——
else if (gameState === "transition") {
  if(!startSound.isPlaying()){
    startSound.play();
    microSound.pause();
    MenuSound.stop();

  }
  background(50, 150, 255); // transition screen color
  fill(255);
  textAlign(CENTER,CENTER);
  imageMode(CENTER);
  text("Great!\nNext game starting...", width / 6, height / 2);
  image(marshScore[index],width/2,height/2,400,400);

  if (millis() - transitionStartTime > transitionDuration) {
    startNextGame();
  }
}

else if (gameState==="smores"){
  Smores();
}

}

function mousePressed(){
  if(gameState==="minigame1"){
    minibar.mousePressed();
  }
  if(gameState === "minigame4"){
    mashing++;
  }
  if(gameState==="minigame5"){
    if (!falling) {
      falling = true;
      yspeed = 5;
      xspeed = 0;
    }
  }
}
function mouseDragged(){
  if (gameState==="minigame6"){
    xChocolate = xChocolate + 8
  }
}

// ALL CUSTOM FUNCTIONS

function startScreen(){
  if(mouseIsPressed){
    if (!MenuSound.isPlaying()){
    MenuSound.play();
   }
  }

  image(bg,width/2,height/2);
  textAlign(CENTER);
  textSize(32);
  text("CLICK ON LEFT MOUSE TO START",width/2,height/2);

  text("Directions: USE LEFT MOUSE TO CLICK AND HOLD",width/2,height/2.5)

  
}

function startNextGame(){
  gameState = random(games);

  //reset minigame3 scores
  cookMarsh = 0;
  //reset minigame2 score
  countdown =5;
  gameOver = false;
  win = false;
  
  //reset minigame4 score
  mashing = 0;

  //reset minigame5 score
  xpos = 200;
  ypos = 30;
  xspeed = 10;
  yspeed = 0;
  falling = false;

  //reset minigame 6 score
  xChocolate = 90;


  if (gameState ==="minigame1"){
    minibar = new Bar();

  }
}
function endScreens(){
  
  textAlign(CENTER, CENTER);
  textSize(32);
  imageMode(CENTER);
  text("Your fire went out! \n this is your score:",width/2,height/6);
  image(marshScore[index],width/2,height/2,400,400);
  text("Put the marshallow in the grahamcracker \n to make the smores",width/2,height/4);

  


  if (keyIsDown(32)){
    startNextGame();
    index = 0;
    smoreIndex = 0;
  }

  if(keyIsDown(DOWN_ARROW)){
    gameState = "smores";
  }
}

function Smores(){
  text("HERE IS YOUR SMORE \n ENJOY", width/2,height/6)
  image(smoreScore[smoresIndex],width/2,height/2,400,400)

  if(mouseIsPressed){
    startNextGame()
    index = 0;
    smoreIndex = 0;
  }

}

function minigame2(){
  
  if (!gameOver) {
    background(220);  // ← only clear while playing

    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    }
    if (mouseIsPressed && countdown > 0) {
      gameOver = true;
      win      = false;
    }
    if (countdown === 0) {
      gameOver = true;
      win      = true;
    }
    image(bg,width/2,height/2);
    textAlign(CENTER);
    fill(0);
    textSize(32);
    text(countdown, width/2, 50);
    text("DO NOT MOVE",width/2,height/2)
  } else {
    // gameOver === true: draw final screen
    if (win) {
      startTransition();
      index = (index +1) % marshScore.length;
      smoresIndex = (smoresIndex +1) % smoreScore.length;
      return;
    } else {
      gameState = "endscreen"}
      return;
  }
}
function minigame3(){
  if (!gameOver) {
    if (mouseIsPressed){
      cookMarsh++;
    }
    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    }
    if (cookMarsh===50 && countdown > 0) {
      gameOver = true;
      win      = true;
    }
    if (countdown === 0) {
      gameOver = true;
      win      = false;
    }
    image(bg,width/2,height/2);
    textAlign(CENTER);
    fill(0);
    textSize(32);
    text(countdown, width/2, 50);
    text(cookMarsh,width/2,height/2.5)
    text("Hold the left mouse to cook\nthe marshmallow", width/2, height/2);
  } else {
    // gameOver === true: draw final screen
    if (win) {
      startTransition();
      index = (index +1) % marshScore.length;
      smoresIndex = (smoresIndex +1) % smoreScore.length;
      return;
    } else {
      gameState = "endscreen"}
      return;
  }

}
function minigame4(){
  image(bg,width/2,height/2);
    textAlign(CENTER);
    fill(0);
    textSize(32);
    text(countdown, width/2, 50);
    text("MASH THE LEFT MOUSE \n TO PUT OUT THE FIRE",width/2,height/2) 
    text(mashing,width/2,70)
  if (!gameOver) {
    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    }
    if (mashing>10 && countdown > 0) {
      gameOver = true;
      win      = true;
    }
    if (countdown === 0) {
      gameOver = true;
      win      = false;
    }
    
  } else {
    // gameOver === true: draw final screen
    if (win) {
      startTransition();
      index = (index +1) % marshScore.length;
      smoresIndex = (smoresIndex +1) % smoreScore.length;
      return;
    } else {
      gameState = "endscreen"}
      return;
  }
}

function minigame5(){
  image(bg,width/2,height/2);
  text(countdown, width/2, 50);
  text("Drop the ball in the box",width/2,70)

  
  rectMode(CENTER);
    let platformX = width / 2;
    let platformY = 350;
    let platformW = 150;
    let platformH = 50;
    rect(platformX, platformY, platformW, platformH);
    ellipse(xpos, ypos, 50);
    
    if (!gameOver) {
      if (frameCount % 30 === 0 && countdown > 0) {
        countdown--;
      }

      if (!falling) {
        xpos += xspeed;
        if (xpos > width || xpos < 0) {
          xspeed *= -1;
        }
      }
      if (falling) {
        ypos += yspeed;
        yspeed += 0.5; // gravity
      }

      if (falling && ypos + 25 >= platformY - platformH / 2) {
        falling = false;
        if (
          xpos >= platformX - platformW / 2 &&
          xpos <= platformX + platformW / 2 
         ) {
          startTransition();
          index = (index +1) % marshScore.length;
          smoresIndex = (smoresIndex +1) % smoreScore.length;
        } else{
          gameState= "endscreen"
        }
      }
      if(countdown===0){
        gameState = "endscreen"
      }

    }
}

function minigame6(){
  image(bg,width/2,height/2);
  push();
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text(countdown, width/2, 50);
  text("Drag and click mouse to the left, to open the choclate",width/2,height/3)
  pop();

  ellipseMode(CENTER)
  ellipse(xChocolate,width/2,90)

  if (!gameOver) {
    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    }
    if (xChocolate>300 && countdown > 0) {
      gameOver = true;
      win      = true;
    }
    if (countdown === 0) {
      gameOver = true;
      win      = false;
    }
    
  } else {
    // gameOver === true: draw final screen
    if (win) {
      startTransition();
      index = (index +1) % marshScore.length;
      smoresIndex = (smoresIndex +1) % smoreScore.length;

      return;
    } else {
      gameState = "endscreen"}
      return;
  }
}





function startTransition() {
  gameState = "transition";
  transitionStartTime = millis(); // get the current time

}