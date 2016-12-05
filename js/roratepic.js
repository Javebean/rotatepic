/**
 * rotate a pic in 90 degrees
 */
// Create an immediately invoked functional expression to wrap our code
(function() {

	// Create global element references
	var canvasScale;
	var canvasHeight;
	var canvasWidth;
	var image;
	var imageHeight;
	var imageWidth;
	var ctx;
	// Define our constructor
	this.Modal = function() {

		// Define option defaults
		var defaults = {
			canvasHeight : 500,
			canvasWidth : 300,
			canvasBgColor : '#000',
			canvasBorderColor : '#000',
			canvasBorderWidth : '1px',
			imageSrc : 'no image url specify'
		}

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}

		// canvas's scale ---> global variable
		canvasHeight = this.options.canvasHeight;
		canvasWidth = this.options.canvasWidth;
		canvasScale = canvasHeight / canvasWidth;

		var canvas = document.getElementById("canvas");
		canvas.style.backgroundColor = this.options.canvasBgcolor;

		// if user boder-width set 0 or 0px then no border
		var canvasBorderWidth = this.options.canvasBorderWidth[0];
		if (!canvasBorderWidth == 0 && !canvasBorderWidth == '0') {
			canvas.style.borderColor = this.options.canvasBorderColor;
			canvas.style.borderWidth = canvasBorderWidth + 'px';
			canvas.style.borderStyle = 'solid';

		}

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx = canvas.getContext("2d");

		image = document.createElement("img");
		image.src = this.options.imageSrc;
		canvasBgcolor = this.options.canvasBgcolor;

		// callback when image load complete
		image.onload = function() {
			// ctx.drawImage(image,canvas.width/2-image.width/2,canvas.height/2-image.width/2);
			// ctx.drawImage(image,0,0, );
			// pic native px
//			 console.log(image.width+"---"+image.height);
			//console.log(image);
			imageHeight = image.height;
			imageWidth = image.width;
			scalePicture(imageHeight, imageWidth, 0);

		}

	}//end of constructor

	// Utility method to extend defaults with user options
	var extendDefaults = function(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	// Public Methods
	var angleInDegrees = 0;
	Modal.prototype.clockwise = function() {
		angleInDegrees += 90;
		drawRotated(angleInDegrees);
	}

	Modal.prototype.counterclockwise = function() {
		angleInDegrees -= 90;
		drawRotated(angleInDegrees);
	}

	var drawRotated = function(degrees) {
		degrees %= 360;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// save the unrotated context of the canvas so we can restore it later
		// the alternative is to untranslate & unrotate after drawing
		ctx.save();

		// move to the center of the canvas
		// ctx.translate(canvas.width/2,canvas.height/2);

		// rotate the canvas to the specified degrees
		ctx.rotate(degrees * Math.PI / 180);

		// draw the image
		// since the context is rotated, the image will be rotated also

		scalePicture(imageHeight, imageWidth, degrees);

		// we’re done with the rotating so restore the unrotated context
		ctx.restore();

	}

	// 缩放图片进入cvs
	var scalePicture = function(img_h, img_w, deg) {
		 console.log("deg:"+deg);

		var img_scale = img_h / img_w;
		if (deg == 90 || deg == 270 || deg == -90 || deg == -270) {
			img_scale = img_w / img_h;
		}
		 console.log(img_scale > canvasScale);

		if (img_scale > canvasScale) {
			// 重新计算图片的按比例缩放进canvas的尺寸
			var img_h = canvasHeight;
			var img_w = img_h / img_scale;
			 console.log(img_w+"--"+img_h);
			if (deg == 180 || deg == -180) {
				ctx.drawImage(image, -(canvasWidth - img_w) / 2 - img_w,
						-img_h, img_w, img_h);
			} else if (deg == 0) {
				ctx.drawImage(image, (canvasWidth - img_w) / 2, 0, img_w,
								img_h);
			} else if(deg == -90 || deg == 270){
				ctx.drawImage(image, -canvasHeight, (canvasWidth - img_w) / 2, img_h,
						img_w);
			} else if(deg == 90 || deg == -270){
				ctx.drawImage(image, 0, -(canvasWidth - img_w) / 2 - img_w, img_h,
						img_w);
			}

		} else {
			var img_w = canvasWidth;
			var img_h = img_w * img_scale;
			// console.log(img_w+"++"+img_h);
			if (deg == 90 || deg == -270) {
				ctx.drawImage(image, (canvasHeight - img_h) / 2, -img_w, img_h,
						img_w);
			} else if (deg == -90 || deg == 270) {
				ctx.drawImage(image, -(canvasHeight - img_h) / 2 - img_h, 0,
						img_h, img_w);
			} else if(deg == 0){
				ctx.drawImage(image, 0, (canvasHeight - img_h) / 2, img_w,
						img_h);
			} else if(deg == 180 || deg == -180){
				ctx.drawImage(image, -canvasWidth, -(canvasHeight - img_h) / 2 - img_h, img_w,
						img_h);
			}
		}
	}
}());