## Introduction

animotion is a library for p5.js that allows you to create animations based on keyframes with a simple API.

## Get started

Include a script tag with the library in your index.html file. Make sure to put it after the p5.js library and before your sketch.js:

```html
<script src="p5.js"></script>
<script src="animotion.js"></script>
<script src="sketch.js"></script>
```

In your sketch file, initialize the library and add an object to your scene in the setup function:

```js
let myAnim;

function setup() {
  createCanvas(400, 400);
  myAnim = createAnim();

  const ball = myAnim.addObj('circle', 100, 200, 50);
}
```

The first argument `addObj` function can be any p5.js 2D primitive. The rest of the arguments are the arguments that that primitive function would normally take. Here, we're adding a circle at (100, 200) with a diameter of 50.

To see the object on the screen, we need to update and render our animation in the draw function.

```js
function draw() {
  background(20);

  myAnim.update();
  myAnim.render()
}
```

To animate our circle, we can use the `addKeyframe` function, which takes a length (in frames) for the first argument, then an object with the attributes we want to change. In this example, we're adding a keyframe that will animate the circle's x position to 300 (from it's current position 100) in the span of 1 second.

```js
function setup() {
  // ...
  ball.addKeyframe(60, {
    x: 300,
  })
}
```

Note: the first argument in the `addKeyframe` method is the length from the previous keyframe to the one being added, as opposed to the actual frame in the animation. The reason for this is that if you decide to add a new keyframe at the beginning of your animation, you won't have to change all of the keyframes that come after it. If you do want to add keyframes at specific frame numbers, you can use the `addKeyframes` method.

The `addKeyframe` method returns the object that the keyframe is being added to, so that you can chain it multiple times. The same goes for the `addObj` method if you don't want/need to create a variable for it:

```js
function setup() {
  createCanvas(400, 400);
  myAnim = createAnim();

  myAnim.addObj('circle', 100, 200, 50)
    .addKeyframe(60, {
      x: 300,
    })
    .addKeyframe(60, {
      x: 100,
    })
}
```

And that's it! Your sketch should be a looping animation of a circle moving smoothly from left to right. By default, all movement is animated with the `easeInOutCubic` easing function which gives the animation its smoothness. The `addKeyframe` method can take an optional 3rd paramater if you would like to specify which easing function to use. [Check here](https://easings.net/) for a nice cheat sheet of the standard easing functions (not all are supported in this library yet!).