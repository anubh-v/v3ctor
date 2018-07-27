function linComboPlayable(vectorList) {
        
    const conditions = [];
    const actions = [];
    const postActions = [];

    /* use an interval of 180 steps --> complete both scaling and translation animation each in 3s */
    const numOfSteps = 300;
 
    vectorList.map(function(vectorObj) {

        const animatedObj = {};

        const vector = createVector(vectorObj.xCoord.value, vectorObj.yCoord.value, vectorObj.zCoord.value,
            new THREE.Vector3(0,0,0), +(getRandomColour()));

        /* add the endpoints of this vector as properties of the vector object */
        animatedObj.x = parseFloat(vectorObj.xCoord.value);
        animatedObj.y = parseFloat(vectorObj.yCoord.value);               
        animatedObj.z = parseFloat(vectorObj.zCoord.value);

        /* Store the created threeJS object into the animated object (will be needed in the reduction done later) */
        animatedObj.graphic = vector;
        
        /* Add the created threeJS object to the scene */
        allObjects.add(vector);
        
        /* obtain the intended scaling factor for this vector  */
        let scale = parseFloat(vectorObj.coeff.value);

        const scaleStep = (scale - 1) / numOfSteps;
        let steps = 0;
        
        /* add a comparator that indicates if the scaling animation has been completed */
        conditions.push(() => { 
           // return Math.floor(vector.scale.x) == scale;
           return steps === numOfSteps;
        });
            
        /* add the action to be taken on each frame of animation */
        actions.push(() => {
            vector.scale.x += scaleStep;
            vector.scale.y += scaleStep;
            vector.scale.z += scaleStep;
            steps++;
        });

        /* update the endpoints of this vector, after scaling */
        animatedObj.x = scale*animatedObj.x;
        animatedObj.y = scale*animatedObj.y;
        animatedObj.z = scale*animatedObj.z;
        
        /* add the postAction to be taken once the scaling animation is complete */
        postActions.push(() => {          
          vector.scale.set(scale, scale, scale);
        });
        
        return animatedObj;

    }).reduce(function(prevVector, nextVector) {
      
        const xDistance = nextVector.x - prevVector.graphic.position.x;
        const xStep = xDistance / numOfSteps;

        const yDistance = nextVector.y - prevVector.graphic.position.y;
        const yStep = yDistance / numOfSteps;

        const zDistance = nextVector.z - prevVector.graphic.position.z;
        const zStep = zDistance / numOfSteps;

        let translationCounter = 0;

        conditions.push(() => {
          return translationCounter == numOfSteps;    
        });

        actions.push(() => {
        
          prevVector.graphic.position.x += xStep;
          prevVector.graphic.position.y += yStep;
          prevVector.graphic.position.z += zStep;
          translationCounter++;
       
        });

        /* calculate resultant vector */
        const resX = prevVector.x + nextVector.x;
        const resY = prevVector.y + nextVector.y;
        const resZ = prevVector.z + nextVector.z;

        const resVector = createVector(resX, resY, resZ, new THREE.Vector3(0,0,0), +(getRandomColour()));
      
        postActions.push(() => {
          allObjects.add(resVector);
          allObjects.remove(prevVector.graphic);
          allObjects.remove(nextVector.graphic);

        });

        const resVectorObj = { };
        resVectorObj.graphic = resVector;
        resVectorObj.x = resX;
        resVectorObj.y = resY;
        resVectorObj.z = resZ;
        
        return resVectorObj;
    });      
          
      let currentCondition = conditions[0];
      let currentAction = actions[0];

      function play() {
        
        if (actions.length == 0) {
          // remove this Playable from the head of the render queue 
          removeFromRenderQueue(play);
        } else {       
          if (currentCondition() == false) {
            // terminating condition not met, continue current animation
            currentAction();
          } else {
            // terminating condition met, proceed to next action      
            postActions[0]();
            postActions.shift();
                    
            conditions.shift();
            actions.shift();

            currentCondition = conditions[0];
            currentAction = actions[0];
          }
        }
      }

      /* add the play function into the render queue --> starts the animation */
      renderQueue.unshift(play);
}


/* remove a given function from the render queue. 
   IMPORTANT: The given function MUST be present in the render queue */
function removeFromRenderQueue(funcToBeRemoved) {
    /* filter the renderQueue, so that only the target function is removed */   
    renderQueue = renderQueue.filter((renderFunction) => renderFunction !== funcToBeRemoved);
}

/* add this function to the renderQueue to rotate the grid about a specified axis */
function rotateGrid(axisToRotate) {
    sceneRoot.rotation[axisToRotate] += 0.01;
}
