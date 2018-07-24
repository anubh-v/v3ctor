var Vectorize = {};

/* tracks mouse position as its user moves it across the screen */
Vectorize.mouse = new THREE.Vector2();
//Vectorize.mousePath = new THREE.Raycaster();

/* this should be set to the dimensions of the canvas element you're monitoring */
const canvas = document.getElementById("stage");
Vectorize.dimensions = [canvas.width,canvas.height];

/*Idea to transform vector dynamically by dragging the point
initilize a global 3-elements array named point.
when mousemoves, update mousecoordinates.
if isDragged is true(i.e. something is being dragged), update the point, and then 
update the graphic& textbox of the input vector, and graphic of the output vector been
transformed
*/
function onDocumentMouseMove(event) {

  //find out the canvas position so that we can make adjustments to 
  // mouseX and mouseY accordingly to find out the mouse coordinate
  const canvasPosition = renderer.domElement.getBoundingClientRect();
  const mouseX = event.clientX - canvasPosition.left;
  const mouseY = event.clientY - canvasPosition.top;
  Vectorize.mouse.x = ( mouseX / Vectorize.dimensions[0] ) * 2 - 1;
  Vectorize.mouse.y = - ( mouseY / Vectorize.dimensions[1] ) * 2 + 1; 

  // if an obj is being dragged, when mouse moves, the domain vector coordinate and graphic will be adjusted
  if (matricesObj.isDragging) {

    matricesObj.matrix.forEach(row => {
      row.forEach(el => el.onblur())
    });

    // update coordinates of domain according to sphere being dragged
    vectorObject.coordinates = findIntersection();

    // store coordinates of domain vector 
    const domainX = vectorObject.coordinates[0];
    const domainY = vectorObject.coordinates[1];
    const domainZ = vectorObject.coordinates[2];

    // remove the old graphics from the scene
    scene.remove(vectorObject.graphicRef);
    scene.remove(imageObject.graphicRef);
    
    // draw the domain vector, add it to the scene, and write its coordinates into the textboxes
    vectorMakerHelper(vectorObject.coordinates, matricesObj.vector, vectorObject); 
 
    /* if the matrix inputs are fully filled, calculate and create the image vector */
    if (!matricesObj.hasNaN) {
      // read the matrix inputs
      const givenMatrix = getMatrix();
      // calculate coordinates of the image vector, as a 3*1 matrix
      const resultant = multiply(givenMatrix, [[domainX], [domainY], [domainZ]]);
      imageObject.coordinates = [resultant[0][0], resultant[1][0], resultant[2][0]];

      // draw the domain vector, add it to the scene, and write its coordinates into the textboxes
      vectorMakerHelper(imageObject.coordinates, matricesObj.image, imageObject);        
    }
  }

  function vectorMakerHelper(coordinatesArray, textBoxArray, containerObj) {
  
    containerObj.graphicRef = 
      createVector(coordinatesArray[0], coordinatesArray[1], coordinatesArray[2],
                   new THREE.Vector3(0, 0, 0),
                   0xffffff);

    scene.add(containerObj.graphicRef);
     
    // add the coordinates of the vector into the given array of HTML textboxes
    for (let i = 0; i < 3; i++) {
      textBoxArray[i].value = containerObj.coordinates[i];
    }       
  }  
}
document.addEventListener('mousemove', onDocumentMouseMove, false); 

/* adds a function func to an event of your choice. func takes a paramter which is passed the raycaster intercepts */

Vectorize.addEventListener = function(type,func,scene,camera){
    function f(event){
        var vector = new THREE.Vector3( Vectorize.mouse.x, Vectorize.mouse.y, -1 ).unproject( camera );
       
        Vectorize.mousePath = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = Vectorize.mousePath.intersectObject(sphere,true);
        func(intersects);
    }
    document.addEventListener(type,f,false);
}

// global boolean checking if an object is being dragged.
Vectorize.addEventListener('mousedown', 
	// enlarge the 1st element when clicked
	function (intersects) {
        if (intersects.length == 0) {
            // console.log("no intersection upon mousedown");
            return;
        }

        matricesObj.isDragging = true;
        // console.log("dragging activated upon mousedown");
		var mesh = intersects[0].object;
		var position = new THREE.Vector3( Vectorize.mouse.x, Vectorize.mouse.y, -1 ).unproject( camera );
		mesh.scale.x *= 1.2;mesh.scale.y *= 1.2;mesh.scale.z *= 1.2; 
	}, scene,camera
); 

Vectorize.addEventListener('mouseup', 
    function(intersects) {
        if (intersects.length == 0 || !matricesObj.isDragging) {
            // console.log("no intersection upon mouseup or nothing being dragged");
            matricesObj.isDragging = false;
            return;
        }
        let mesh = intersects[0].object;
        mesh.scale.x *= 1/1.2;mesh.scale.y *= 1/1.2;mesh.scale.z *= 1/1.2;
        let intersectionPoint = intersects[0].point;
        console.log("object has been dragged to: (" + 
            intersectionPoint.getComponent(0) + "," + 
            intersectionPoint.getComponent(1) + "," + 
            intersectionPoint.getComponent(2) + ")"
            );

        matricesObj.isDragging = false;
    }, scene,camera
);

/*
postcond: return the coordinate of intersection as 3 element array,
if no intersection return null
*/
function findIntersection() {
    var worldCoord = new THREE.Vector3( Vectorize.mouse.x, Vectorize.mouse.y, -1 ).unproject( camera );
    Vectorize.mousePath = new THREE.Raycaster(camera.position, worldCoord.sub(camera.position).normalize());
    var intersects = Vectorize.mousePath.intersectObject(sphere,true); 
    if (intersects.length == 0) {
        return null;
    } else {
        let intersectionPoint = intersects[0].point;
        return [intersectionPoint.getComponent(0),
                intersectionPoint.getComponent(1),
                intersectionPoint.getComponent(2)];
    }
}

/*
Vectorize.addEventListener('mouseup', 
	// enlarge the 1st element when clicked
	function (intersects) {
		test = intersects;
		var mesh = intersects[0].object;
		mesh.scale.x *= 1/1.2;
		mesh.scale.y *= 1/1.2;
		mesh.scale.z *= 1/1.2; 
	}, scene,camera
	); 
*/

/*

Vectorize.addEventListener = function(type,camera){
    function f(event){
    	console.log("mouse: (" + Vectorize.mouse.x + "," + Vectorize.mouse.y + ")");
    	var vArr = new THREE.Vector3( Vectorize.mouse.x, Vectorize.mouse.y, -1 ).unproject( camera );
    	console.log("vector: (" + vArr.getComponent(0) + "," + vArr.getComponent(1) + "," + vArr.getComponent(2) + ")");
    	//createLine(vArr); // draw the vector as a line
    	var lineMatrix = [[],[],[]];
    	for (var x = 0; x < 3; x++) {
    		var currentRow = lineMatrix[x];
    		currentRow.push(vArr.getComponent(x));
    		currentRow.push(vArr.getComponent(x) - camera.position.getComponent(x));
    	}
    	// draw the ray projection line
    	linePlotter(lineMatrix);
    }
    // note that f is as good as anonymous function that give rise to
    // variable capture
    renderer.domElement.addEventListener(type,f,false);
}

Vectorize.addEventListener("click",camera);

*/



