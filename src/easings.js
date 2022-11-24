function lerp(n1, n2, t) {
  return (n2 - n1) * t + n1;
}

function smoothStep(t) {
  return lerp(easeInQuad(t), easeOutQuad(t), t);
}

function linear(t) {
  return t;
}

function easeInOutGeneral(t, n) {
  if (t < 0.5) {
    return Math.pow(2, n-1) * Math.pow(t, n);
  }
  return 1 - Math.pow(2, n-1) * (Math.pow((1-t), n));
}

function easeInQuad(t) {
  return t * t;
}

function easeOutQuad(t) {
  return 1 - (1-t)*(1-t);
}

function easeInOutQuad(t) {
  return easeInOutGeneral(t, 2)
}

function easeInCubic(t) {
  return t*t*t;
}

function easeOutCubic(t) {
  const t1 = 1-t;
  return 1 - t1*t1*t1;
}

function easeInOutCubic(t) {
  return easeInOutGeneral(t, 3);
}

function easeInQuart(t) {
  return t*t*t*t;
}

function easeOutQuart(t) {
  const t1 = 1-t;
  return 1 - t1*t1*t1*t1;
}

function easeInOutQuart(t) {
  return easeInOutGeneral(t, 4);
}

function easeInQuint(t) {
  return t*t*t*t*t;
}

function easeOutQuint(t) {
  const t1 = 1-t;
  return 1 - t1*t1*t1*t1*t1;
}
function easeInOutQuint(t) {
  return easeInOutGeneral(t, 5);
}

export default {
  linear,
  smoothStep,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInOutQuint,
  easeInQuint,
  easeOutQuint,
}