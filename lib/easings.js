class Easings {
  
  static lerp(n1, n2, t) {
    return (n2 - n1) * t + n1;
  }

  static smoothStep(t) {
    return Easings.lerp(Easings.easeInQuad(t), Easings.easeOutQuad(t), t);
  }
  
  static easeInOutGeneral(t, n) {
    if (t < 0.5) {
      return Math.pow(2, n-1) * Math.pow(t, n);
    }
    return 1 - Math.pow(2, n-1) * (Math.pow((1-t), n));
  }

  static easeInQuad(t) {
    return t * t;
  }

  static easeOutQuad(t) {
    return 1 - (1-t)*(1-t);
  }
  
  static easeInOutQuad(t) {
    return Easings.easeInOutGeneral(t, 2)
  }

  static cubicIn(t) {
    return t*t*t;
  }

  static cubicOut(t) {
    const t1 = 1-t;
    return 1 - t1*t1*t1;
  }

  static easeInOutCubic(t) {
    return Easings.easeInOutGeneral(t, 3);
  }
  
  static quartIn(t) {
    return t*t*t*t;
  }

  static quartOut(t) {
    const t1 = 1-t;
    return 1 - t1*t1*t1*t1;
  }

  static easeInOutQuart(t) {
    return Easings.easeInOutGeneral(t, 4);
  }
  
  
  static easeInOutQuint(t) {
    return Easings.easeInOutGeneral(t, 5);
  }

}
