
class Bar {
  constructor() {
    this.reset();
  }

  reset() {
    this.circle = {
      x: width/2,
      y: width / 1.2,
      r: 50,
      color: 0
    };
    this.xSpeed = 5;
    this.hit    = 0;
    this.miss = 0;
    this.directions = {
      x: width / 2,
      y: height / 4,
      size: 24,
      word: "SWAT THE FLY!"
    };
  }

  // draw the moving circle
  update() {
    fill(this.circle.color);
    ellipse(this.circle.x, this.circle.y, this.circle.r);
  }

  // draw the green target
  show() {
    rectMode(CENTER);
    fill(0, 255, 0);
    rect(width / 2, height / 1.2, 200, 50);
  }

  // display instructions
  drawText() {
    textAlign(CENTER);
    textSize(this.directions.size);
    fill(0);
    text(this.directions.word,
         this.directions.x,
         this.directions.y);
  }

  // move & check for hit
  bounce() {
    this.circle.x += this.xSpeed;
    if (this.circle.x > width - 300 || this.circle.x < 0 + 300) {
      this.xSpeed *= -1;
    }

    // if mouse is pressed while circle overlaps the green box
  }
  mousePressed(){
  let leftEdge  = width/2 - 100;
    let rightEdge = width/2 + 100;
    if (mouseIsPressed &&
        this.circle.x >= leftEdge &&
        this.circle.x <= rightEdge) {
      this.hit++;
        } else{
          this.miss++;
        }
    } 
}