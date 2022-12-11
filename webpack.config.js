const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'animotion.js',
    path: path.resolve(__dirname, 'lib'),
  },
  watch: true,
};