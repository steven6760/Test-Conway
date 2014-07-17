(function(){
	$(document).ready(function(){
		
		var cubes = [];
		var sS = 4; // squareSize
		var wL = 260, wH = 160; // worldLength and worldHeight
		var gameLoopSpeed = 1000/18;
		
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
				cubes.push(thisCube);
				cubes[i].cubeNum = i;
			}
		}
		
		function update(){
			applyGameRules();
			switchGameStates();
		}
		
		function applyGameRules(){
			for(var i = 1; i < cubes.length - 1; i++){
				if(countNeighboringCubes(cubes[i]) == 3){
					cubes[i].toLive = true;
					cubes[i].toDie = false;
				}else{
					cubes[i].toDie = true;
					cubes[i].toLive = false;
				}
			}
		}
		
		function countNeighboringCubes(cube){
			var x = 0;
			check(cubes[cube.cubeNum - wL]);
			check(cubes[cube.cubeNum - 1]);
			check(cubes[cube.cubeNum + 1]);
			check(cubes[cube.cubeNum - wL]);
			check(cubes[cube.cubeNum + wL]);
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
		
		function switchGameStates(){
			for(var i in cubes){
				if(cubes[i].toLive){
					cubes[i].alive = true;
					cubes[i].toLive = false;
					cubes[i].toDie = false;
				}
			}
		}
		
		function render(){
			for(var i in cubes){
				if(cubes[i].alive == true){
					ctx.fillStyle = "blue";
					ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
				}// else{
// 					ctx.fillStyle = "#c0c0c0";
// 					ctx.fillRect(sS * (i%wL), sS * Math.floor(i/wL), sS, sS);
// 				}
			}
		}
		
		//////
		//////
		
		function Cube (x, y){
			this.x = x;
			this.y = y;
			this.alive = false;
			this.clicked = false;
			this.toLive = false;
			this.toDie = false;
			this.cubeNum = 0;
		}

		$("#canvas").click(function(e){
			var x = Math.floor((e.pageX-$("#canvas").offset().left) / sS - 1.75); // Minus is modifier
			var y = Math.floor((e.pageY-$("#canvas").offset().top) / sS - 1.75); // to account for click 
			cubes[y * wL + x].alive = true;
			render();
		});
		
	});
})();

