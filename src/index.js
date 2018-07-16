
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } from "./three.module.js";

// scene setup variables
var scene,camera ,renderer ,light ;
meshArr=[]; // Array to keep track of all the cubes in the scene
var i =0;
var color, size; // Default color and size variable
var requestID; // Helps to start and stop animation

// function calls
init();
update();

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
         light =  = new AmbientLight(0x444444);
			   light.position.set(50, 0, 0);
			   scene.add(light);
				 renderer.render(scene, camera);
			};

      // render loop
      const update = () =>{
          requestID = requestAnimationFrame(update);
          render();
          //console.log(meshArr.length);
          renderer.render( scene, camera );
        };

      function render(){
          i++;
					if (color == null ){
						color = 0xff4000;
					}
					if(size == null){
						size = 10;
					}
					if(i%100 === 0){
            createCubes(color, size);
          }
          renderer.render(scene, camera);
        };

        // Function to start animation
        // Called when clicking the start button on screen.
        function startAnimation(){
					requestID = requestAnimationFrame(update);
					document.getElementsByClassName("dropdown")[0].disabled = false;
				};

        // Function to pause animation
        // Called when clicking the pause button on screen.
				function pauseAnimation(){cancelAnimationFrame(requestID);};

        // Fucntion to create cubes in the scebe
        //  color: material color
        // size : size of cube
        function createCubes(color, size) {
          var geometry = new THREE.BoxGeometry( 1, 1, 1 );
          var material = new THREE.MeshPhongMaterial( {color: color} );
          var mesh = new THREE.Mesh( geometry, material );
          //randomly set position and scale
          mesh.position.x = (Math.random()-0.5)*550;
          mesh.position.y = (Math.random()-0.5)*350;
          mesh.position.z = (Math.random()-0.5)*100;
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random()  * Math.PI;
          mesh.rotation.z = Math.random()  * Math.PI;
					mesh.scale.x = mesh.scale.y = mesh.scale.z =  size;
					//console.log(mesh.position.x +" "+mesh.position.y+" "+mesh.position.z);
          meshArr.push(mesh);
          scene.add(mesh);
        };

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
        };

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
				};
