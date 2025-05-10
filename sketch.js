

// ALL GLOBAL VARIABLES
let bg;
let games = ["minigame1","minigame2","minigame3","minigame4","minigame6"]
let marsh1,marsh2,marsh3,marsh4,marsh5,marsh6,marsh7,marsh8,marsh9,marsh10;
let marshScore;
let index=0;
let gameState;
let cookMarsh;//cook minigame3
let minibar;
//minigame 2
let countdown = 5;
let gameOver = false;
let win = false;
let mashing = 0;

//minigame 6
let xChocolate = 90;



//transition 
let transitionStartTime = 0;
let transitionDuration = 1000;  // in milliseconds (1 second)

function preload(){
  bg  = loadImage ("assets/nightbg.png");
  marsh1 = loadImage("assets/Marsh1.png")
  marsh2 = loadImage("assets/Marsh2.png")
  marsh3 = loadImage("assets/Marsh3.png")
  marsh4 = loadImage("assets/Marsh4.png")
  marsh5 = loadImage("assets/Marsh5.png")
  marsh6 = loadImage("assets/Marsh6.png")
  marsh7 = loadImage("assets/Marsh7.png")
  marsh8 = loadImage("assets/Marsh8.png")
  marsh9 = loadImage("assets/Marsh9.png")
  marsh10 = loadImage("assets/Marsh10.png")
  marshScore = [marsh1,marsh2,marsh3,marsh4,marsh5,marsh6,marsh7,marsh8,marsh9,marsh10]





}

function setup() {
  let canvas = createCanvas(900,900);
  
  canvas.parent("Marshmallow") 
  textAlign(CENTER, CENTER);
  textSize(32);
  frameRate(30);

  startNextGame();  // pick the first game


}

function draw() {
  background(255);
  imageMode(CENTER,CENTER);
  image(bg,width/2,height/2);

  if(gameState==="minigame1"){
    minibar.bounce();
    minibar.show();
    minibar.update();
    minibar.drawText();
    if (minibar.hit > 0){
      startTransition();
      index = (index +1) % marshScore.length;
      return; // skip rest of draw this frame
    } else if(minibar.miss > 0){
      gameState = "endscreen";
    }
  }
  else if (gameState==="minigame2"){
    minigame2();
  }
  else if(gameState === "minigame3"){
    minigame3();
  }
  else if(gameState==="minigame4"){
    minigame4();
  }
  else if(gameState==="minigame5"){
    minigame5();
  }
  else if(gameState==="minigame6"){
    minigame6();
  }
else if (gameState==="endscreen"){
  endScreens();
}
// —— TRANSITION STATE ——
else if (gameState === "transition") {
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


}

function mousePressed(){
  if(gameState==="minigame1"){
    minibar.mousePressed();
  }
  if(gameState === "minigame4"){
    mashing++;
  }
  if(gameState==="minigame5"){
    
  }
}
function mouseDragged(){
  if (gameState==="minigame6"){
    xChocolate = xChocolate + 8
  }
}

// ALL CUSTOM FUNCTIONS

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
  xspeed = 2;
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

  if (keyIsPressed){
    startNextGame();
    index = 0;
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
      return;
    } else {
      endScreens();
    }
  }
}
function minigame3(){
  if (mouseIsPressed){
    background(0);
    cookMarsh++;
    textAlign(CENTER);

    text("Hold the left mouse to cook\nthe marshmallow", width/2, height/2);
  }else{
    textAlign(CENTER);
    text("Hold the left mouse to cook\nthe marshmallow", width/2, height/2);
  }

  if(cookMarsh ===50){
    startTransition();
    index = (index +1) % marshScore.length;
    return;
  }

}
function minigame4(){
  textAlign(CENTER);
  textSize(32);
  text("MASH THE LEFT MOUSE \n TO PUT OUT THE FIRE",width/2,height/2) 
  if(mashing>10){
    startTransition();
    index = (index +1) % marshScore.length;
  }
}
function minigame6(){
  push();
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Drag and click mouse to the left, to open the choclate",width/2,height/3)
  pop();

  ellipseMode(CENTER)
  ellipse(xChocolate,width/2,90)

  if(xChocolate>300){
    startTransition();
  }
}





function startTransition() {
  gameState = "transition";
  transitionStartTime = millis(); // get the current time
}