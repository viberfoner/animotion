import Easings from './easings'
import { mergeDeep } from './util'
import { PRIM_ARGS } from './defaults'

p5.Anim.Obj = function(p, prim, props, anim) {
  
  this.p = p;
  this.prim = prim;
  this.anim = anim;
  this._init = props;
  this._temp = {};
  
  // mergeDeep(this, ANIM_DEFAULTS(p)[prim].defaults);
  
  mergeDeep(this, props);
  
  this.keyFrames = [{
    frame: 0,
  }];
  
  this._current = 0;
  
}

Object.defineProperties(p5.Anim.Obj.prototype, {
  current: {
    get: function current() {
      return this.keyFrames[this._current];
    }
  },

  next: {
    get: function next() {
      return this.keyFrames[this._current+1];
    }
  }
})

p5.Anim.Obj.prototype.addKeyFrame = function(
  length,
  targetProps,
  easingFn='easeInOutCubic'
) {
  const frame = this.keyFrames.at(-1).frame+length
  this.keyFrames.push({
    frame,
    targetProps,
    easingFn
  });

  this.anim.updateLength(this);

  return this;
}
  
p5.Anim.Obj.prototype.addKeyFrames = function(
  data,
  easingFn='easeInOutCubic'
) {
  for (let frame in data) {
    frame = parseInt(frame);
    this.keyFrames.push({
      frame,
      targetProps: data[frame],
      easingFn
    });

    this.anim.updateLength(this);
  }
  return this;
}
  
p5.Anim.Obj.prototype.updateKeyFrame = function(frame) {
  if (this.next && 
      frame >= this.next.frame &&
      this._current < this.keyFrames.length-1) {
    this._current++;
  }
}

p5.Anim.Obj.prototype.setFill = function() {
  if (arguments[0] instanceof p5.Color) {
    this.fill = arguments[0];
    if (!this._init.fill) {
      this._init.fill = this.p.color(arguments[0].toString());
    }
    return this;
  }
  this.fill = this.p.color(...arguments);
  if (!this._init.fill) {
    this._init.fill = this.p.color(...arguments);
  }
  return this;
}

p5.Anim.Obj.prototype.setStroke = function() {
  if (arguments[0] instanceof p5.Color) {
    this.stroke = arguments[0];
    if (!this._init.stroke) {
      this._init.stroke = this.p.color(arguments[0].toString());
    }
    return this;
  }
  this.stroke = this.p.color(...arguments);
  if (!this._init.stroke) {
    this._init.stroke = this.p.color(...arguments);
  }
  return this;
}

p5.Anim.Obj.prototype.setStrokeWeight = function(num) {
  this.strokeWeight = num;
  return this;
}

p5.Anim.Obj.prototype.update = function(frame) {
  this.updateKeyFrame(frame);
  
  if (!this.next || !this.next.targetProps) return;
  
  const targetProps = this.next.targetProps;
  
  const dur = this.next.frame - this.current.frame;
  const easingFn = typeof this.next.easingFn === 'function' ? 
    this.next.easingFn : Easings[this.next.easingFn];
  const t = easingFn((frame-this.current.frame)/dur);

  for (let prop in targetProps) {
    if (frame === this.current.frame ||
          frame === 1
        ) {
      if (prop === 'fill' || prop === 'stroke') {
        this._temp[prop] = this.p.color(this[prop].toString());
      }
      else this._temp[prop] = this[prop];
    }

    if (prop === 'fill' || prop === 'stroke') {
      const newCol = this.p.color(targetProps[prop]);
      this[prop] = this.p.lerpColor(
        this._temp[prop],
        newCol,
        t
      );
      continue;
    }
    this[prop] = this.p.lerp(
      this._temp[prop],
      this.next.targetProps[prop],
      t
    );
  }
}

p5.Anim.Obj.prototype.renderFn = function() {
  const defaultArgs = PRIM_ARGS[this.prim];
  let args = [];

  for (const arg of defaultArgs.required) {
    args.push(this[arg]);
  }

  if (defaultArgs.optional) {
    for (const arg of defaultArgs.optional) {
      if (this[arg]) {
        args.push(this[arg]);
      }
    }
  }

  this.p[this.prim](...args);
}

p5.Anim.Obj.prototype.render = function() {

  if (this.fill) {
    this.p.fill(this.fill);
  }

  if (this.stroke) {
    this.p.stroke(this.stroke);
  }

  if (this.strokeWeight) {
    this.p.strokeWeight(this.strokeWeight);
  }

  this.renderFn();
  
}

p5.Anim.Obj.prototype.reset = function() {
  mergeDeep(this, this.defaults)
  mergeDeep(this, this._init)
  this._current = 0;
}
 