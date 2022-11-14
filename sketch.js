const myp5 = new p5(p => {

const myAnim = new Animation(p, {loop: true});
  
p.setup = () => {
  
  p.createCanvas(400, 400);
  p.colorMode(p.HSB, 100);
  p.noStroke();
  
  const easings = [
    t=>t,
    Easings.easeInOutQuad,
    Easings.easeInOutCubic,
    Easings.easeInOutQuart,
    Easings.easeInOutQuint,
  ]

  for (let i = 0; i < 5; i++) {
    myAnim.addObject(new AnimObj({
      x: 50,
      y: 100+i*50,
      r: 50,
      hue: i*20,
    }, myp5)
      .addKeyFrame(120, { x: 350 }, easings[i])
      .addKeyFrame(240, { x: 50 }, easings[i])
    );
  }
}

p.draw = () => {
  p.background(20);

  myAnim.update();
  myAnim.render();
}

});
