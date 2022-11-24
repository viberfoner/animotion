let anim;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  anim = createAnim(true);
  anim.addObj('circle', 200, 200, 200)
    .setFill(0, 70, 70)
    .setStroke(0, 70, 50)
    .setStrokeWeight(5)
    .addKeyFrames({
      60: {
        d: 20,
        strokeWeight: 1,
      },
      120: {
        d: 200,
        strokeWeight: 5,
      }
    });
}

function draw() {
  background(20);

  anim.update();
  anim.render();
}