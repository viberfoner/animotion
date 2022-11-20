const ANIM_DEFAULTS = p => ({
  circle: {
    defaults: {
      x: p.width/2,
      y: p.height/2,
      d: 50,
      fill: {
        h: 0,
        s: 70,
        b: 70,
        a: 100,
      },
    }
  },

  arc: {
    defaults: {
      x: p.width/2,
      y: p.height/2,
      w: 50,
      h: 50,
      start: 0,
      stop: p.TWO_PI,
      fill: {
        h: 0,
        s: 70,
        b: 70,
        a: 100,
      },
      stroke: {
        h: 0,
        s: 70,
        b: 60,
        a: 100,
      },
      weight: 5,
    },
  },

  line: {
    defaults: {
      x1: p.width/2,
      y1: p.height/2,
      x2: p.width/2,
      y2: p.height/2-50,
      stroke: {
        h: 0,
        s: 70,
        b: 60,
        a: 100,
      },
      weight: 5,
    }
  }
    
});

const PRIM_ARGS = {

  arc: {
    required: ['x', 'y', 'w', 'h', 'start', 'stop'],
    optional: ['mode', 'detail'],
  },

  ellipse: {
    required: ['x', 'y', 'w'],
    optional: ['h'],
  },

  circle: {
    required: ['x', 'y', 'd'],
  },

  line: {
    required: ['x1', 'y1', 'x2', 'y2'],
  },

  point: {
    required: ['x', 'y'],
    optional: ['z'],
  },

  quad: {
    required: ['x1', 'y1', 'x2', 'y2', 'x3', 'y3', 'x4', 'y4'],
    optional: ['detailX', 'detailY'],
  },

  rect: {
    required: ['x', 'y', 'w'],
    optional: ['h', 'tl', 'tr', 'br', 'bl'],
  },

  square: {
    required: ['x', 'y', 's'],
    optional: ['tl', 'tr', 'br', 'bl'],
  },

  triangle: {
    required: ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'],
  },

}