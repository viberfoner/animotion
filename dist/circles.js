let anim;
const numCircles = 50;

function setup() {
  
  createCanvas(400, 400);
  colorMode(HSB, 100);
  noStroke();

  anim = createAnim();

  for (let i = numCircles-1; i >= 0; i--) {
    anim.addObj('circle', -50, 200, 50)
      .setFill(0, 70, 70)
      .addKeyFrame(60, { x: 200 })
      .addKeyFrame(20)
      .addKeyFrame(60, {
        d: 30+i*7,
        fill: [i/numCircles*10, 70 , 70],
      })
      .addKeyFrame(20)
      .addKeyFrame(60, { d: 0 })
  }
}

function draw() {
  background(20);

  anim.update();
  anim.render();
}
