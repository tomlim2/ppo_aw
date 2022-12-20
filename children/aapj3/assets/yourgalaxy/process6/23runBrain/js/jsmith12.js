$(document).ready(function() {
      window.myPalette = getRandomPalette();
      var $window = $(window);
      var $canvas = $('<canvas id="forest">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
      $('body').prepend($canvas);
      $('body').css({"background-color": getRandomColors()});
			var canvas = document.getElementById('forest');


			if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
					recursiveTree(ctx, 600, 705, 110, -Math.PI / 2, 13, 10);
          recursiveTree(ctx, 100, 705, 80, -Math.PI / 2, 13, 10);
          recursiveTree(ctx, 1000, 705, 80, -Math.PI / 2, 13, 10);
				}
			});

      var getRandomPalette = function(){
        var randPalette = palettes[Math.floor(Math.random() * palettes.length)];
        return randPalette;
      }


      var getRandomColors = function(){
        var randomColors = Math.floor(Math.random() * 5);
        return myPalette[randomColors];
      };



var recursiveTree = function (ctx, startX, startY, length, angle, depth, branchWidth ) {
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
		ctx.strokeStyle = getRandomColors();
	}
	else {
		ctx.strokeStyle = getRandomColors();
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
		recursiveTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);
	}
};
