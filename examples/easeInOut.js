let anim;
  
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  noStroke();

  anim = createAnim();

  const easings = [
    'linear',
    'easeInOutQuad',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
  ]

  for (let i = 0; i < 5; i++) {
    anim.addObj('circle', 50, 100+i*50, 50)
      .setFill(i*20, 70, 70)
      .addKeyFrame(120, {
        x: 350,
        fill: [(i+1)*20, 70, 70],
      }, easings[i])
      .addKeyFrame(120, {
        x: 50,
        fill: [i*20, 70, 70],
      }, easings[i])
  }
}

function draw() {
  background(20);

  anim.update();
  anim.render();
}
