
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, BoxGeometry, MeshPhongMaterial, Mesh ,SpotLight} from "./three.module.js";

// scene setup variables
var scene,camera ,renderer ,light , spotLight;
var meshArr=[]; // Array to keep track of all the cubes in the scene
var color, size; // Default color and size variable
var requestID; // Helps to start and stop animation
var start = new Date().getTime(); // delta time timer
document.getElementById("start").addEventListener("click", startAnimation);
document.getElementById("pause").addEventListener("click", pauseAnimation);

document.getElementById("min").addEventListener("click", function(){changeSize(size, false)},false);
document.getElementById("max").addEventListener("click", function(){changeSize(size, true)},false);

document.getElementById("red").addEventListener("click", function(){changeColor(0xff4000)},false);
document.getElementById("green").addEventListener("click", function(){changeColor(0x00FF00)},false);
document.getElementById("blue").addEventListener("click", function(){changeColor(0x0000FF)},false);
document.getElementById("yellow").addEventListener("click", function(){changeColor(0xffff66)},false);
document.getElementById("pink").addEventListener("click", function(){changeColor(0xff00ff)},false);
document.getElementById("orange").addEventListener("click", function(){changeColor(0xff9933)},false);
document.getElementById("purple").addEventListener("click", function(){changeColor(0x6600cc)},false);

// function calls
init();
    // Function to initialize all the variables for setting up the scene.
    function init() {
         scene = new Scene();
			   renderer = new WebGLRenderer();
         camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			   renderer.setSize(window.innerWidth, window.innerHeight);
			   renderer.setClearColor(0x140b33, 1);
			   container.appendChild(renderer.domElement);
			   camera.position.z= 500;
			   scene.add(camera);
         spotLight = new SpotLight( 0xffffff );
         spotLight.position.z=500;
         light = new AmbientLight(0x444444);
			   scene.add(light,spotLight );
				 renderer.render(scene, camera);
			}

      // render loop
      function update () {
        var current = new Date().getTime();
        var delta = current - start;
        if(delta >= 1000) {

          render();
          start = new Date().getTime();
        }

          requestID = requestAnimationFrame(update);
          console.log(meshArr.length);  //Debug
          renderer.render( scene, camera );
        }

      function render(){
					if (color == null ){
						color = 0xff4000;
					}
					if(size == null){
						size = 10;
					}
          createCubes(color, size);
          renderer.render(scene, camera);
        }

        // Function to start animation
        // Called when clicking the start button on screen.
        function startAnimation(){
					requestID = requestAnimationFrame(update);
				}

        // Function to pause animation
        // Called when clicking the pause button on screen.
				function pauseAnimation(){cancelAnimationFrame(requestID);};

        // Fucntion to create cubes in the scebe
        //  color: material color
        // size : size of cube
        function createCubes(color, size) {
          var geometry = new BoxGeometry( 1, 1, 1 );
          var material = new MeshPhongMaterial( {color: color} );
          var mesh = new Mesh( geometry, material );
          //randomly set position and scale
          mesh.position.x = (Math.random()-0.5)*1500;
          mesh.position.y = (Math.random()-0.5)*800;
          mesh.position.z = (Math.random()-0.5)*100;
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random()  * Math.PI;
          mesh.rotation.z = Math.random()  * Math.PI;
					mesh.scale.x = mesh.scale.y = mesh.scale.z =  size;
					//console.log(mesh.position.x +" "+mesh.position.y+" "+mesh.position.z);
          meshArr.push(mesh);
          scene.add(mesh);
        }

        // Function to change color of all cubes in the Scene
        // It will change the color variable so that all cubes
        // later created changes their color to selected color.
        // Called when one of the colors is choosen from the scene.
        function changeColor(col){
					color = col;
					if (meshArr.length === 0){return;}
					for(var i=0;i<meshArr.length;i++){
						  meshArr[i].material.color.set(col);
					}
        }

        // Fucntion to change the size of the scene
        // It will change the size variable so that all cubes
        // later created change their size to the new size.
        // Called when one of the buttons in size dropdown is choosen from the scene.
        // IF while clicking min: size becomes zero it sends out an alerts.
				function changeSize(num, flag){
					console.log(num);
					if (meshArr.length === 0){return;}
					if(flag === false){
						if (size-1 === 0){
							alert("Min size reached!!")
							return;
						}
					}
						if(flag === true){
							size = num+1;
						}else{
							size = num-1;
						}
						for(var i=0;i<meshArr.length;i++){
							  meshArr[i].scale.x = size;
								meshArr[i].scale.y = size;
								meshArr[i].scale.z = size;
					}
				}
