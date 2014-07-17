(function(){
	$(document).ready(function(){
		
		// Potential bug AAA
		
		var cubes = [];
		var sS = 6; // squareSize
		var wL = 120, wH = 90; // worldLength and worldHeight
		var gameLoopSpeed = 1000/30;
		var blueCount = 0;
		var wS = wL * wH; // worldSize
		var initProb = .40; // P that cube starts alive
		var mutationProb = 1/6000; //Prob of mutation
		
		//Defaults small game: sS 13, wL wH 30, speed 1000/1.0, initProb .08
		
		
		function SArray (){
			var a = [];
			this.i = 0;
			var i = this.i;
			a.push(1); //switch to null
			var myString;
			var langCode = [];
			this.sPush = function (pushInput){
				var pushInputString = pushInput.toString();
				var iString = i.toString();
				langCode = iString.toString().substr(3,8);
				myString = "a.push(" + pushInputString + "); this."
				 + iString + " = function(){return a[" + iString
				  + "];}";
				eval(myString);
				i++;
			}
			this.sLength = function(){
				return a.length - 1;
			}
		}
		
		function stringToBinary(stringValue) {
		    return stringValue.replace(/.{1}/g, function (matchedString) {
		        var binString = matchedString.charCodeAt(0).toString(2);
		        return '00000000'.substring(0, 8 - binString.length) + binString;
		    });
		}
		
		function binaryToString(binValue) {
		    return binValue.replace(/[01]{8}/g, function (matchedString) {
		        return String.fromCharCode(parseInt(matchedString, 2));
		    });
		}
		
		
		var s = "a";
		var o = s.charAt(0);
		//var output = s.charCodeAt(0) - 96;
		var output = stringToBinary(s);
		var binOut = binaryHandler(output);
		console.log(o); 
		
		function converter(input){
			var a = binaryHandler(input);
			var b = intHandler(a);
			//var c = 
		}
		
		function binaryHandler(iNum){
			var string = iNum.toString().substr(3,8);
			var oNum = parseInt(string, 2);
			return oNum;
		}
		
		function intHandler(int){
			int++;
			var string = int.toString(2);
			return string;
		}
		
		function stringToSize(){ // Converts string to the correct size, 5 characters
			
		}
		
		///
		
		var alphabet = [["a", 1],["b", 2],["c", 3], ["d", 4], ["e", 5], ["f", 6], ["g", 7],
			["h", 8], ["i", 9]
		]
		
		console.log(alphabet);
		
		
		
		var mySArray = new SArray();
		//mySArray.sPush(3);
		// mySArray.sPush(4);
		// console.log(mySArray.sLength);
		// console.log(mySArray.1);
		
		// Initialize canvas with desired settings
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		$canvas = $('canvas');
		$canvas.attr('width', wL * sS);
		$canvas.attr('height', wH * sS);
		
		//////
		//////
		
	
		addKeyListeners();
		
		function addKeyListeners(){
			window.addEventListener("keydown", function(e){
				keys[e.keyCode] = true;
			}, false);
		
			window.addEventListener("keyup", function(e){
				delete keys[e.keyCode];
			}, false);
		}
		
		
		//////
		//////
		
		init();
		loop();
		
		function init(){
			createCubes();
			render();
		}
		
		function loop(){
			setInterval(function(){
				update();
				render();
			}, gameLoopSpeed);
		}

		function createCubes(){
			for(var i = 0; i<=wL*wH - 1; i++){
				var thisCube = new Cube(i % wL, Math.floor(i/wL));
				thisCube.cubeNum = i + 1;
				thisCube.x = (i + 1) % wL;
				thisCube.y = Math.floor((i+1)/wL) + 1;
				cubes.push(thisCube);
				if(Math.random()>(1-initProb))cubes[i].alive = true;
			}
		}
		
		function Cube (x, y){
			this.x = x;
			this.y = y;
			this.alive = false;
			this.clicked = false;
			this.toLive = false;
			this.toDie = false;
			this.cubeNum = 0;
		}
		
		function update(){
			applyGameRules();
			switchGameStates();
		}
		
		function applyGameRules(){
			for(var i = 0; i < cubes.length; i++){ // IS MINUS 1 CORRECT??? AAA
				
				var count = countNeighboringCubes(cubes[i]);
				if(count == 3 /*&& Math.random() > blueCount/wS*/){
					cubes[i].toLive = true;
					cubes[i].toDie = false;
				}else if(count == 2 && cubes[i].alive == true){
					cubes[i].toLive = true;
					cubes[i].toDie = false;
				}else if(count > 3 && Math.random()>1-mutationProb){
					cubes[i].toLive = true;
					cubes[i].die = false;
				}else{
					cubes[i].toDie = true;
					cubes[i].toLive = false;
				}
			}
		}
		
		function mod (n, m){ // Javascript modulo bug, dealing with negative #'s
			return (n + m) %  m;
		}
		
		function countNeighboringCubes(cube){ //contains problem with left and right touching
			var x = 0;
			
			//check(cubes[mod(cube.cubeNum - 1, wL)/* + cube.y * wL*/]);
			check(cubes[cube.cubeNum - 1]);
			check(cubes[cube.cubeNum + 1]);
			//check(cubes[cube.cubeNum + 1]);
			//check(cubes[cube.cubeNum - wL]);
			check(cubes[cube.cubeNum - wL])
			
			check(cubes[cube.cubeNum + wL])
			;
			check(cubes[cube.cubeNum - wL - 1]);
			check(cubes[cube.cubeNum - wL + 1]);
			check(cubes[cube.cubeNum + wL - 1]);
			check(cubes[cube.cubeNum + wL + 1]);
			return x;
			
			function check(input){
				if (typeof input !== 'undefined'){
					if (input.alive) x++;
				}
			}
		}
		
		
		
		function countOnSphereSpace(cube){ // adds interaction between top and bottom
			var x = 0;
			if(cube.cubeNum - wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}
			//check(cubes[cube.cubeNum - 1]);
			if(cube.cubeNum - 1 > 0){
				check(cubes[cube.cubeNum - 1]);
			}else{
				check(cubes[cube.cubeNum + wS - 1]);
			}
			//check(cubes[cube.cubeNum + 1]);
			if(cube.cubeNum-wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}

			
			//check(cubes[cube.cubeNum + wL]);
			check(cubes[cube.cubeNum - wL - 1]);
			if(cube.cubeNum-wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}
			check(cubes[cube.cubeNum - wL + 1]);
			if(cube.cubeNum-wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}
			check(cubes[cube.cubeNum + wL - 1]);
			if(cube.cubeNum-wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}
			check(cubes[cube.cubeNum + wL + 1]);
			if(cube.cubeNum-wL > 0){
				check(cubes[cube.cubeNum - wL]);
			}else{
				check(cubes[cube.cubeNum + wS - wL]);
			}
			return x;
			
			function check(input){
				if (typeof input !== 'undefined'){
					if (input.alive) x++;
				}
			}
		}
		
		function switchGameStates(){
			blueCount = 0;
			for(var i in cubes){
				if(cubes[i].toLive){
					cubes[i].alive = true;
					blueCount++;
				}else{cubes[i].alive = false;}
				cubes[i].toLive = false;
				cubes[i].toDie = false;
			}
		}
		
		function render(){
			for(var i in cubes){
				if(cubes[i].alive == true){
					//ctx.fillStyle = "blue";
					//ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
					ctx.beginPath();
					ctx.rect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
					ctx.fillStyle = "#5050d0";
					ctx.fill();
					ctx.lineWidth = 0;
					ctx.strokeStyle = "#000080";
					//ctx.stroke();
				}else{
					ctx.beginPath();
					ctx.rect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
					ctx.fillStyle = "#fafafa";
					ctx.fill();
					ctx.lineWidth = 0;
					ctx.strokeStyle = "#a0a0a0";
					//ctx.stroke();
					//ctx.fillStyle = "#f0f0f0";
					//ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
				}
			}
		}
		
		//////
		//////
		

		// $("#canvas").click(function(e){
		// 	var x = Math.floor((e.pageX-$("#canvas").offset().left) / sS - 1.75); // Minus is modifier
		// 	var y = Math.floor((e.pageY-$("#canvas").offset().top) / sS - 1.75); // to account for click
		// 	cubes[y * wL + x].alive = true;
		// 	render();
		// });
		
		trackTransforms(ctx);
		function redraw(){
			// Clear the entire canvas
			var p1 = ctx.transformedPoint(0,0);
			var p2 = ctx.transformedPoint(canvas.width,canvas.height);
			ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

			// Alternatively:
			// ctx.save();
			// ctx.setTransform(1,0,0,1,0,0);
			// ctx.clearRect(0,0,canvas.width,canvas.height);
			// ctx.restore();

			ctx.drawImage(gkhead,200,50);

		}
		redraw();
	
		var lastX=canvas.width/2, lastY=canvas.height/2;
		var dragStart,dragged;
		canvas.addEventListener('mousedown',function(evt){
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragStart = ctx.transformedPoint(lastX,lastY);
			dragged = false;
		},false);
		canvas.addEventListener('mousemove',function(evt){
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragged = true;
			if (dragStart){
				var pt = ctx.transformedPoint(lastX,lastY);
				ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
				redraw();
			}
		},false);
		canvas.addEventListener('mouseup',function(evt){
			dragStart = null;
			if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		},false);

		var scaleFactor = 1.1;
		var zoom = function(clicks){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x,pt.y);
			var factor = Math.pow(scaleFactor,clicks);
			ctx.scale(factor,factor);
			ctx.translate(-pt.x,-pt.y);
			redraw();
		}

		var handleScroll = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom(delta);
			return evt.preventDefault() && false;
		};
		canvas.addEventListener('DOMMouseScroll',handleScroll,false);
		canvas.addEventListener('mousewheel',handleScroll,false);
			
		gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
		ball.src   = 'http://phrogz.net/tmp/alphaball.png';
	
		// Adds ctx.getTransform() - returns an SVGMatrix
		// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
		function trackTransforms(ctx){
			var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
			var xform = svg.createSVGMatrix();
			ctx.getTransform = function(){ return xform; };
		
			var savedTransforms = [];
			var save = ctx.save;
			ctx.save = function(){
				savedTransforms.push(xform.translate(0,0));
				return save.call(ctx);
			};
			var restore = ctx.restore;
			ctx.restore = function(){
				xform = savedTransforms.pop();
				return restore.call(ctx);
			};

			var scale = ctx.scale;
			ctx.scale = function(sx,sy){
				xform = xform.scaleNonUniform(sx,sy);
				return scale.call(ctx,sx,sy);
			};
			var rotate = ctx.rotate;
			ctx.rotate = function(radians){
				xform = xform.rotate(radians*180/Math.PI);
				return rotate.call(ctx,radians);
			};
			var translate = ctx.translate;
			ctx.translate = function(dx,dy){
				xform = xform.translate(dx,dy);
				return translate.call(ctx,dx,dy);
			};
			var transform = ctx.transform;
			ctx.transform = function(a,b,c,d,e,f){
				var m2 = svg.createSVGMatrix();
				m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
				xform = xform.multiply(m2);
				return transform.call(ctx,a,b,c,d,e,f);
			};
			var setTransform = ctx.setTransform;
			ctx.setTransform = function(a,b,c,d,e,f){
				xform.a = a;
				xform.b = b;
				xform.c = c;
				xform.d = d;
				xform.e = e;
				xform.f = f;
				return setTransform.call(ctx,a,b,c,d,e,f);
			};
			var pt  = svg.createSVGPoint();
			ctx.transformedPoint = function(x,y){
				pt.x=x; pt.y=y;
				return pt.matrixTransform(xform.inverse());
			}
		}
		
		
		
		
		
	});
})();

