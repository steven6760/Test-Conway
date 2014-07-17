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
		var newCubes = []
		
		newInit();
		newLoop();
		
		function newInit(){
			createCubes();
			assignCubeAliveValues();
		}
		
		function newLoop(){
			setInterval(function(){
				assignCubeAliveValues();
				newRender();
			}, 1000/2);
		}

		function createCubes(){
			for(var i = 1; i<=wL*wH; i++){
				var thisCube = new Cube(i % wL, Math.floor(i/wL));
				newCubes.push(thisCube);
			}
		}
		
		function assignCubeAliveValues(){
			
			for(var i in newCubes){
				newCubes[i].alive = false;
			}
			
			for(var j in newCubes){
				if(Math.random()<.5){
					newCubes[j].alive = true;
				}
			}
		}
		
		function newRender(){
			for(var i in newCubes){
				
				if(newCubes[i].alive == true){
					ctx.fillStyle = "blue";
					ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
				}else{
					ctx.fillStyle = "#c0c0c0";
					ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
				}
			}
		}
		
		//////
		
		function Cube (x, y){
			this.x = x;
			this.y = y;
			this.alive = false;
		}


			    $("#canvas").click(function(e){

			       var x = Math.floor((e.pageX-$("#canvas").offset().left) / sS);
			       var y = Math.floor((e.pageY-$("#canvas").offset().top) / sS);
			       ctx.fillStyle = "red";


		   alert(x + " " + y);

			    });
		
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

