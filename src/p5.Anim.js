import { mergeDeep } from './util'
import { PRIM_ARGS } from './defaults'

p5.prototype.createAnim = function(loop=true) {
  const anim = new p5.Anim(this, loop);
  return anim;
}

p5.prototype.copyColor = function(col) {
  if (!col instanceof p5.Color) {
    throw new Error("p5.copyColor must take an instance of p5.color as its only argument")
  }
  return new p5.Color(this, col.toString());
}

p5.Anim = function(p, loop=true) {
  
  this.p = p;
  this.scene = [];
  this.loop = loop;
  this.length = 0;
  this.frame = 0;

}

p5.Anim.prototype.addObj = function(prim, ...args) {

  const defaultArgs = PRIM_ARGS[prim];
  let allArgs = [...defaultArgs.required];
  if (defaultArgs.optional) allArgs = [...allArgs, ...defaultArgs.optional]
  const props = {};

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      mergeDeep(props, args[i]);
    } else {
      props[allArgs[i]] = args[i];
    }
  }

  const obj = new p5.Anim.Obj(this.p, prim, props, this);
  
  this.scene.push(obj);
  
  this.updateLength(obj);

  return obj;

}
  
p5.Anim.prototype.updateLength = function(obj) {
  const finalKeyFrame = obj.keyFrames.at(-1).frame;
  
  if (this.length < finalKeyFrame) {
    this.length = finalKeyFrame;
  }
}

p5.Anim.prototype.update = function() {
  this.frame++;
  if (this.loop && this.frame >= this.length) {
    this.reset()
  }
  for (const obj of this.scene) {
    obj.update(this.frame);
  }
}
  
p5.Anim.prototype.render = function() {
  this.p.push();

  for (const obj of this.scene) {
    obj.render();
  }

  this.p.pop();
}

p5.Anim.prototype.reset = function() {
  this.frame = 0;
  for (const obj of this.scene) {
    obj.reset();
  }
}
