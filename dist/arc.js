let anim;

function setup() {
  console.log(circle);
  createCanvas(400, 400);
  
  colorMode(HSB);
  noStroke();
  ellipseMode(RADIUS);

  const radius = 190;

  anim = createAnim();

  anim.addObj('arc', width/2, height/2, 0, 0, -HALF_PI, -HALF_PI)
    .setFill(0, 70, 70)
    .setStroke(0,70,50)
    .setStrokeWeight(5)
    .addKeyFrame(60, {
      w: 190,
      h: 190,
    })
    .addKeyFrame(60, {
      stop: 1.5*PI,
    })
    .addKeyFrame(60, {
      start: 1.5*PI,
    })
    .addKeyFrame(60, {
      start: 0,
      stop: 0,
    })
    .addKeyFrame(60, {
      stop: PI
    })
    .addKeyFrame(60, {
      w: 0,
      h: 0,
    });

  anim.addObj('arc',  width/2, height/2, radius, radius, PI, PI)
    .setFill(0, 70, 70)
    .setStroke(0,70,50)
    .setStrokeWeight(5)
    .addKeyFrame(240)
    .addKeyFrame(60, {
      stop:TWO_PI,
    })
    .addKeyFrame(60, {
      w: 0,
      h: 0,
    });

  anim.addObj('line', width/2, height/2, width/2, height/2)
    .setStrokeWeight(5)
    .setStroke(0,70,50)
    .addKeyFrame(60, {
      y2: height/2-radius,
    })
    .addKeyFrame(120, {
    })
    .addKeyFrame(60, {
      x1: width/2-radius,
      y1: height/2,
      x2: width/2+radius,
      y2: height/2,
    })
    .addKeyFrame(60)
    .addKeyFrame(60, {
      x1: width/2,
      y1: height/2,
      x2: width/2,
      y2: height/2,
    });
}

function draw() {
  background(20);

  anim.update();
  anim.render();
}
