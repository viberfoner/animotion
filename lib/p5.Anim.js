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


function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {}});
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
      return mergeDeep(target, ...sources);
    }
}

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
  easingFn=Easings.easeInOutCubic
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
  easingFn=Easings.easeInOutCubic
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
  const t = this.next.easingFn((frame-this.current.frame)/dur);

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
      newCol = this.p.color(targetProps[prop]);
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
 