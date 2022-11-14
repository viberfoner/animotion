class Animation {
  
  constructor(p, options={loop:true}) {
    this.p = p;
    this.scene = [];
    this.loop = options.loop;
    this.length = 0;
    this.frame = 0;
  }
  
  addObject(obj) {
    
    this.scene.push(obj);
    
    const finalKeyFrame = obj.keyFrames.at(-1).frame;
    
    if (this.length < finalKeyFrame) {
      this.length = finalKeyFrame;
    }

  }
  
  update() {
    this.frame++;
    if (this.loop && this.frame >= this.length) {
      this.reset()
    }
    for (const obj of this.scene) {
      obj.update(this.frame);
    }
  }
  
  render() {
    for (const obj of this.scene) {
      obj.render();
    }
  }
  
  reset() {
    this.frame = 0;
    for (const obj of this.scene) {
      obj.reset();
    }
  }
  
}


class AnimObj {
  constructor(data, p) {
    
    this.p = p;
    this._init = {};
    
    const defaults = {
      x: p.width/2,
      y: p.height/2,
      r: 50,
    }
    
    for (const prop in defaults) {
      this[prop] = defaults[prop];
    }
    
    for (const prop in data) {
      this[prop] = data[prop];
      this._init[prop] = data[prop];
    }
    
    
    this.keyFrames = [{
      frame: 0,
    }];
    
    this._current = 0;
    
  }
    
  get current() {
    return this.keyFrames[this._current];
  }

  get next() {
    return this.keyFrames[this._current+1];
  }

  addKeyFrame(
    frame,
    targetProps,
    easingFn=Easings.easeInOutCubic
  ) {
    this.keyFrames.push({
      frame,
      targetProps,
      easingFn
    });
    return this;
  }
  
  updateKeyFrame(frame) {
    if (this.next && 
        frame >= this.next.frame &&
        this._current < this.keyFrames.length-1) {
      this._current++;
    }
  }
  
  update(frame) {
    this.updateKeyFrame(frame);
    
    if (!this.next || !this.next.targetProps) return;
    
    const targetProps = this.next.targetProps;
    
    const dur = this.next.frame - this.current.frame;
    const t = this.next.easingFn((frame-this.current.frame)/dur);

    for (const prop in targetProps) {
      if (frame === this.current.frame ||
           frame === 1
         ) {
        this[prop+'_temp'] = this[prop];
      }

      this[prop] = this.p.lerp(
        this[prop+'_temp'],
        this.next.targetProps[prop],
        t
      );
    }
  }

  render() {
    this.p.push();
    
    this.p.fill(this.hue, 70, 70);
    this.p.circle(this.x, this.y, this.r);
    
    this.p.pop();

  }
  
  reset() {
    for (const prop in this._init) {
      this[prop] = this._init[prop];
      this._current = 0;
    }
  }
  
}
