$(document).ready(function() {
      window.myPalette = getRandomPalette();
      var $window = $(window);
      var $canvas = $('<canvas id="forest" width="' + $window.width() + '" height="' + $window.height() + '">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
      $('body').prepend($canvas);
      // $('body').css({"background-color": getRandomColors()});
			var canvas = document.getElementById('forest');


			if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
      recursiveTree(ctx, 800, 705, 22, -Math.PI / 1.2, 13, 3, getRandomPalette());
					recursiveTree(ctx, 800, 705, 32, -Math.PI / 1.4, 13, 3, getRandomPalette());
          recursiveTree(ctx, 800, 705, 22, -Math.PI / 1.6, 13, 3, getRandomPalette());
          recursiveTree(ctx, 800, 705, 42, -Math.PI / 2, 13, 3, getRandomPalette());
          recursiveTree(ctx, 800, 705, 22, -Math.PI / 2.4, 13, 3, getRandomPalette());
          recursiveTree(ctx, 800, 705, 32, -Math.PI / 2.6, 13, 3, getRandomPalette());
          recursiveTree(ctx, 800, 705, 22, -Math.PI / 2.8, 13, 3, getRandomPalette());
				}
			});

      var getRandomPalette = function(){
        var randPalette = palettes[Math.floor(Math.random() * palettes.length)];
        return randPalette;
      }


      var getRandomColors = function(palette){
        palette = palette || myPalette;
        var randomColors = Math.floor(Math.random() * 5);
        return palette[randomColors];
      };



var recursiveTree = function (ctx, startX, startY, length, angle, depth, branchWidth, palette ) {
  	var rand = Math.random,
  		newLength, newAngle, newDepth, maxBranch = 3,
  		endX, endY, maxAngle = 2 * Math.PI / 4,
  		subBranches;


	ctx.beginPath();
	ctx.moveTo(startX,startY);
	endX = startX + length * Math.cos(angle);
	endY = startY + length * Math.sin(angle);
	// ctx.lineCap = 'round';
	ctx.lineWidth = branchWidth;
	ctx.lineTo(endX, endY);

	if (depth <= 4) {
		ctx.strokeStyle = getRandomColors(palette);
	}
	else {
		ctx.strokeStyle = getRandomColors(palette);
	}
	ctx.stroke();


	newDepth = depth - 1;

	if (!newDepth) {
		return;
	}

	subBranches = (rand() * (maxBranch - 1)) + 1;

	branchWidth *= 0.7;

	for ( var i = 0; i < subBranches; i++ ) {
		newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
		newLength = length * (0.7 + rand() * 0.4);
		recursiveTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth, palette);
	}
};
