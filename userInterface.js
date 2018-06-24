
/* register event handlers */
var addVectorBtn = document.getElementById("addVector");
addVectorBtn.onclick = addControls;

var renderBtn = document.getElementById("renderVectors");
renderBtn.onclick = () => { drawAllVectors(vectorList); };

// when span button is pressed, plot the vectors
var spanBtn = document.getElementById("span");
spanBtn.onclick = () => { 
  var m = getVectorsToSpan(checkBoxList,vectorList); 
  printMatrix(m); 
  drawSpan(m);
}
 


var numVectors = 0; // for debugging

var vectorList = []; // store the list of vectors entered by the user
var checkBoxList = []; // store the list of checkboxes on the Vectors Form


/* add a set of text input boxes representing 1 vector to the web page
   Then, store references to these input boxes in an object and add this object
   to the vectorStack */
function addControls() {
  numVectors = numVectors + 1; 
  
  // get a reference to the form holding the textboxes and checkboxes
  var vectorsInnerForm = document.getElementById("vectorsInnerForm");
  
  // create and add 4 textboxes
  var inputXCoord = makeInputBox("text");
  vectorsInnerForm.appendChild(inputXCoord);

  var inputYCoord = makeInputBox("text");
  vectorsInnerForm.appendChild(inputYCoord);
  
  var inputZCoord = makeInputBox("text");
  vectorsInnerForm.appendChild(inputZCoord);

  var inputCoeff = makeInputBox("text");   
  vectorsInnerForm.appendChild(inputCoeff);
  
  // create and add 1 checkbox to webpage
  var checkBox = makeInputBox("checkbox");
  vectorsInnerForm.appendChild(checkBox);
  
  var vectorObj = {
    xCoord: inputXCoord,
    yCoord: inputYCoord,
    zCoord: inputZCoord,
    coeff: inputCoeff
  };

  vectorList.push(vectorObj);
  checkBoxList.push(checkBox);
    
}

/* use to create either textboxes or checkboxes
   returns a reference to the created inputBox */
function makeInputBox(inputType) {
  
  var textBox = document.createElement("INPUT");
  textBox.setAttribute("type", inputType);
  
  return textBox;
}

