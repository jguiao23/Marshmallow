
// ALL GLOBAL VARIABLES
//background & sound
let bg;
let isPlaying = false;
let gameOverSound;
let gameOverSoundTrigger=false;
let MenuSound;
let microSound;
let startSound;
let screenState=0;
let restart =false;
let pixelFont;
let stick;
let tutorial;
let wash;


let games = ["minigame1","minigame2","minigame3","minigame4","minigame5","minigame6"]
let marsh1,marsh2,marsh3,marsh4,marsh5,marsh6,marsh7,marsh8,marsh9,marsh10;
let smore1,smore2,smore3,smore4,smore5,smore6,smore7,smore8,smore9,smore10;
let marshScore;
let index=0;
let smoresIndex=0;
let gameState="startScreen";
let cookMarsh;//cook minigame3
let minibar;

//minigame1
let fly;
let swatter;
let target;
let hit=0;
let miss=0
let flyX;
let flyY;
let flySpeed;
let leftEdge;
let rightEdge;





//minigame 2
let countdown = 30;
let freezeCount = 5;
let gameOver = false;
let win = false;
let mashing = 0;

//minigame3
let campfire;
//minigame 4
let fan;
//minigame 5 
let mouth;
let xpos = 200;
let ypos = 30;
let xspeed = 10;
let yspeed = 0;
let falling = false;
let resultShown = false;

//minigame 6
let xChocolate = 100;
let chocolatebar;
let chocolate;



//transition 
let transitionStartTime = 0;
let transitionDuration = 1500;  // in milliseconds (1 second)

function preload(){
  tutorial = loadImage("assets/tutorial.gif")
  wash = loadImage("assets/water.png");
  pixelFont = loadFont("assets/pixel.otf")
  stick = loadImage("assets/stick.png")
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


  //minigame assets
  
  //minigame1
  fly = loadImage("assets/fly.png")
  swatter = loadImage("assets/swatter.gif")
  target = loadImage("assets/target.png")

  //minigame2
  
  //minigame3
  campfire = loadImage("assets/campfire.gif")
  //minigame4
  fan = loadImage("assets/fan.gif")
  //minigame5
  mouth=loadImage("assets/mouth.png")
  //minigame6
  chocolatebar = loadImage("assets/chocolatebar.png")
  chocolate = loadImage("assets/chocolate_square.png")
  
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
  fill(255);
  imageMode(CENTER,CENTER);
  image(bg,width/2,height/2);
  textFont(pixelFont);
  textSize(50);
  
  
  if (keyIsDown(UP_ARROW)){
      gameState="endscreen";
    }

  if (gameState ==="startScreen"){
    if(screenState===0){
    preScreen();
    }
    if(screenState===1){
      startScreen();
    }
    if(screenState===2){
     startTransition();
  }
}

  if(gameState==="minigame1"){
    if (!microSound.isPlaying()){
      microSound.play();
      startSound.stop();
      MenuSound.stop();
    }
    text(countdown, width/2, 50);
    if (!gameOver) {
      if (frameCount % 30 === 0 && countdown > 0) {
        countdown--;
      }
    }
    if (countdown===0){
      gameState="endscreen"
    }
    minigame1();
    

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
  // if(marshScore[index]>=marshScore.length-1){
  //   gameState = "checkpoint";
  // }
  background(50, 150, 255); // transition screen color
  fill(255);
  textAlign(CENTER,CENTER);
  imageMode(CENTER);
  text("Amazing\nNext game starting...", width / 2, height / 4);
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
  if (gameState==="startScreen"){
    screenState++;
  }

  if(gameState==="minigame1"){
    // minibar.mousePressed();
    leftEdge  = width/2 - 100;
    rightEdge = width/2 + 100;
    if (mouseIsPressed &&
      flyX >= leftEdge &&
      flyX <= rightEdge) {
      hit++;
      } else{
        miss++;
        }
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
    xChocolate = xChocolate + 15
  }
}

// ALL CUSTOM FUNCTIONS

function preScreen(){
  text("1. INSERT MARSHMALLOW\n TO THE STICK",width/2,height/3)
  text("2. PRESS ON THE FIRE\n TO OPEN MENU",width/2,height/1.2)

  image(stick,width/4,500,300,300)
  push()
  textSize(100);
  text("->",width/2,500)
  pop()
  image(marsh1,width/1.3,550,400,400)

}

function startScreen(){
  if(mouseIsPressed){
    if (!MenuSound.isPlaying()){
    MenuSound.play();
   }
  }
  
  image(bg,width/2,height/2);
  textAlign(CENTER);
  textSize(32);
  text("PRESS ON THE FIRE \nAGAIN TO START",250,height/1.8);

  text("Directions:\n 1.USE THE \nMARSHMALLOW TO \nCLICK AND HOLD",240,height/2.5)
  push()
  textAlign(CENTER,RIGHT);
  text("2. HIT THE \nWATER BUCKET\n IF YOU LIKE\n YOUR \nMARSHMALLOW",700,height/2.6)
  pop()
  image(tutorial,width/3.9,700,300,300);
  image(campfire,width/2.9,700,200,200)
  image(wash,width/1.3,700,300,300)
}

function startNextGame(){
  gameState = random(games);
  countdown--;

  //reset minigame1 score
  flyX=width/2
  flyY=height/2
  flySpeed=50

  hit=0
  miss=0;
  //reset minigame3 scores
  cookMarsh = 0;
  //reset minigame2 score
  freezeCount = 5;
 
  gameOver = false;
  win = false;
  
  //reset minigame4 score
  mashing = 0;

  //reset minigame5 score
  xpos = 200;
  ypos = 150;
  xspeed = 10;
  yspeed = 0;
  falling = false;

  //reset minigame 6 score
  xChocolate = 250;

  
}
function endScreens(){
  
  textAlign(CENTER, CENTER);
  textSize(32);
  imageMode(CENTER);
  text("Your fire went out! \n this is your marshmallow:",width/2,height/4);
  image(marshScore[index],width/2,500,600,600);
  text("Put the marshallow in the \ngrahamcracker to make the smores",width/2,750);
  
  //if(index>=marshScore.length-1){
  //text("YOU BURNT THE SMORES WTF")
  //}else 
  // text("Your fire went out! \n this is your score:",width/2,height/6);


  if (keyIsDown(32)){
    startTransition();
    index = 0;
    smoreIndex = 0;
    countdown = 30;
  }

  if(keyIsDown(DOWN_ARROW)){
    gameState = "smores";
  }
}

function Smores(){
  text("HERE IS YOUR SMORE \n ENJOY", width/2,height/3)
  image(smoreScore[smoresIndex],width/2,height/2,600,600)

  text("Press on the fire to retry!",width/2,700)

  if(mouseIsPressed){
    startTransition()
    index = 0;
    smoreIndex = 0;
    countdown= 30;
  }

}

function minigame1(){
imageMode(CENTER);
textAlign(CENTER);
text("SWAT THE FLY!!!",width/2,height/4)
image(fly,flyX,flyY,300,300)
image(target,width/2,height/2.1,300,300)

//bounce code
flyX += flySpeed;
  if(flyX > width -100 || flyX < 0 + 100){
    flySpeed*= -1;
  }

  if(hit>0){
    startTransition();
    index = (index +1) % marshScore.length;
    smoresIndex = (smoresIndex +1) % smoreScore.length;
  }else if(miss>0){
    gameState="endscreen"
    }


}

function minigame2(){
  
  if (!gameOver) {
    background(220);  // ← only clear while playing

    if (frameCount % 30 === 0 && freezeCount > 0) {
      freezeCount--;
    }
    if (mouseIsPressed && freezeCount > 0) {
      gameOver = true;
      win      = false;
    }
    if (freezeCount === 0) {
      gameOver = true;
      win      = true;
    }
    image(bg,width/2,height/2);
    textAlign(CENTER);
    textSize(32);
    text(countdown, width/2, 50);
    push();
    fill(255,0,0);
    textSize(80);
    text(freezeCount, width/2, 200);
    text("DO NOT MOVE",width/2,height/2);
    pop();

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
    if (cookMarsh===100 && countdown > 0) {
      gameOver = true;
      win      = true;
    }
    if (countdown === 0) {
      gameOver = true;
      win      = false;
    }
    imageMode(CENTER);
    image(bg,width/2,height/2);
    textAlign(CENTER);
    textSize(32);
    text(countdown, width/2, 50);
    push()
    textSize(50);
    text(cookMarsh,width/2,200);
    pop()

    text("Press the marshmallow in the fire \nto cook the marshmallow", width/2, 600);
    
    
    image(campfire,width/2,height/2.5,400,400)
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
    textSize(32);
    text(countdown, width/2, 50);
    text("WHACK THE MARSHMALLOW \n TO PUT OUT THE FIRE",width/2,700)
     push()
     textSize(50);
    text(mashing,width/2,200)
    pop()
    image(campfire,width/2,height/2,400,400)
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
  imageMode(CENTER);
  image(bg,width/2,height/2);
  text(countdown, width/2, 50);
  text("Drop the marshmallow \n in the mouth!",width/2,350)

  rectMode(CENTER);
    let platformX = width / 2;
    let platformY = 800;
    let platformW = 150;
    let platformH = 50;
    rect(platformX, platformY, platformW, platformH);
    image(mouth,width/2,490)
    // ellipse(xpos, ypos, 50);
    image(marsh1,xpos,ypos,400,400);
    
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
  imageMode(CENTER);
  image(bg,width/2,height/2);
  textAlign(CENTER);
  textSize(32);
  text(countdown, width/2, 50);
  text("Drag the marshmallow to the left,\n to open the chocolate bar",width/2,height/3)

  imageMode(CENTER);
  image(chocolate,xChocolate,height/2)
  image(chocolatebar,250,height/1.5,500,500)



  if (!gameOver) {
    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    }
    if (xChocolate>600 && countdown > 0) {
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