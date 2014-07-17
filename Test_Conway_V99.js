(function(){
	$(document).ready(function(){
		
		var cubes = [];
		var cubeValues = [];
		var sS = 10; // squareSize
		var wL = 30, wH = 30; // worldLength and worldHeight
		
		// Initialize canvas with desired settings
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		$canvas = $('canvas');
		$canvas.attr('width', wL * sS);
		$canvas.attr('height', wH * sS);
		
		// HOW TO 2D ARRAY
		// var items = [[1,2],[3,4],[5,6]];
		// alert(items[0]);
		
		
	
		addKeyListeners();
		
		function addKeyListeners(){
			window.addEventListener("keydown", function(e){
				keys[e.keyCode] = true;
			}, false);
		
			window.addEventListener("keyup", function(e){
				delete keys[e.keyCode];
			}, false);
		}
		
		

		init();
		loop();
		
		function init(){
			declareCubeArray();
			assignCubeValues();
			//createCubeObjects();
		}
		
		function loop(){
			setInterval(function(){
				assignCubeValues();
				render();
			}, 1000/4);
		}
		
		function declareCubeArray(){
			for(var i=1;i<=wL;i++){
				for(var j = 1; j<=wH; j++){
					cubes.push([i,j]);
				}
			}
		}

		function assignCubeValues(){

			for(var i in cubeValues){
				cubeValues[i] = false;
			}

			for(var j = 0; j < wL * wH; j++){
				cubeValues[Math.floor(Math.random() * (wL * wH))] = true;
			}
		}
		
		var newCubes = []
		
		newInit();

		function newInit(){
			for(var i = 1; i<=wL*wH; i++){
				var thisCube = new Cube(i % wL, Math.floor(i/wL));
				newCubes.push(thisCube);
			}
		}
		
		console.log(newCubes);

		// function createCubeObjects(){
		//
		// 	//for(var i )
		//
		// }
		
		function render(){
			for(var l = 0; l<cubes.length; l++){
				if(cubeValues[l] == true){
					ctx.fillStyle = "blue";
					ctx.fillRect(sS * (l%wL), sS * Math.floor(l/wL), sS, sS);
				}else{
					ctx.fillStyle = "gray";
					ctx.fillRect(sS * (l%wL), sS * Math.floor(l/wL), sS, sS);
				}
			}
		}
		
		function Cube (x, y){
			this.x = x;
			this.y = y;
			this.alive = false;
		}
		
		var myCube = new Cube(2,3);
		
		// function cubeIdentify(var x, var y){
		// 	return cubeValues[sS * (l%wL), sS * Math.floor(l/wL), sS, sS)];
		// }
		//
		// 	    $("#canvas").click(function(e){
		//
		// 	       var x = Math.floor((e.pageX-$("#canvas").offset().left) / sS);
		// 	       var y = Math.floor((e.pageY-$("#canvas").offset().top) / sS);
		// 	       ctx.fillStyle = "red";
		//
		//
		//    alert(y);
		//
		// 	    });
		
		// $canvas.click(function(e){
		//
		//     var x = Math.floor((e.pageX-$("#canvas").offset().left));
		//     var y = Math.floor((e.pageY-$("#canvas").offset().top));
		//
		// 	document.write(x + "<br" + y);
		//
		// });
		
	});
})();

