
var palettes = require('./color-palettes.json');


var count = palettes.length;
var cols = Math.ceil(count / rows);
var width = tileSize * cols + padding * (cols + 1);
var height = tileSize * rows + padding * (rows + 1);

palettes.forEach((palette, i) => {
  var x = Math.floor(i % cols);
  var y = Math.floor(i / cols);

  palette.forEach((color, j, colors) => {
    // var t = j / (colors.length - 1);
    var sliceWidth = tileSize / colors.length;
    var tx = (x * (padding + tileSize)) + j * sliceWidth;
    ctx.fillStyle = color;
    ctx.fillRect(
      padding + tx,
      padding + y * (padding + tileSize),
      sliceWidth,
      tileSize);
  });
});

fs.writeFile(outfile, canvas.toBuffer(), (err) => {
  if (err) throw err;
});
