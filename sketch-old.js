const myp5 = new p5(p => {

const numCircles = 50;
const myAnim = new Animation(p, {loop: true});
  
p.setup = () => {
  
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 100);
  p.noStroke();

  
  for (let i = numCircles-1; i >= 0; i--) {
    myAnim.addObject(new AnimObj({
      x: -50,
      y: 200,
      r: 50,
      hue: 0,
    }, myp5)
      .addKeyFrame(60, { x: 200 })
      .addKeyFrame(80)
      .addKeyFrame(140, {
        r: 30+i*7,
        hue: i/numCircles*10
      })
      .addKeyFrame(160)
      .addKeyFrame(220, { r: 0 })
    );
  }
}

p.draw = () => {
  p.background(20);

  myAnim.update();
  myAnim.render();
}

});
