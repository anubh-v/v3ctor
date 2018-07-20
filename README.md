# v3ctor

### Proposed Level of achievement: Project Gemini

### Motivation:   
Beginners often find linear algebra rather abstract. Many ideas, though, can be interpreted geometrically. 
For example, here are some standard facts:
  1. Vectors from the rowspace are orthogonal to vectors from the nullspace.
  2. The columnspace is the range of a matrix.
  3. For symmetric matrices, the eigenvectors of distinct eigenvalues are orthogonal to each other. 

These facts can be logically proven, but we felt that visualising such ideas provides a more intuitive basis for understanding.
We wanted a tool that allows students to toy around with these concepts and get visual results. Current alternatives are limited to math software suites like MATLAB which are powerful, but not very friendly to new students.

### Aim  
To create a web application with a user-friendly interface that allows new students to toy with various concepts and get visual feedback.

 ### User stories/ features

*All animations, vectors and vector spaces will be plotted on a 3D grid representing the Euclidean space.

The current version can be accessed [here](https://visual-vector.firebaseapp.com/)

Below are our user stories.

Admin / user interface
	

    As a student, I should be able to rotate the 3D grid and the lines / planes / vector drawn on it
    After rotating the grid, I should be able to reset the camera to a default view.
    As a student, I should have a button to let the 3d graphic rotate about its own axis automatically
    Label vectors  / spans when we hover the mouse over them, by showing xyz coordinates of the vector / span
    Making features obvious
        Pop up tooltips
    Preserve session state - preserve a user's work when he / she refreshes or revists the page

Vectors
	

    As a student, I should be able to input a specific vector and view its geometric representation.
    As a student, I should be able to specify a linear combination of some vectors of my choice, and watch an animation constructing the resultant vector.
    As a student, I should be able to hide / unhide vectors / spans on the grid using checkboxes

Spans
	

    As a student, I should be able to specify a set of vectors and see a visual representation of the span of this set of vectors (either a line, plane or the whole space). I should be able to watch a simple animation of the span being constructed.
    [Continuing from above] Next, I should be able to pick out a particular vector within the span and find out how this vector can be expressed in terms of the vectors I originally specified. If the vectors specified are LI, it should alert the user that the inputs are invalid
    As a student, I should see the equations of lines and planes that are drawn for me.

Matrices
	

    As a student, I should be able to specify a 3-by-3 matrix A and a vector X, and see the resultant vector AX on the 3D grid.
    As a student, I should be able to specify a 3-by-3 matrix, and see the eigenspaces, range and nullspace of this matrix. Visualising the range is the same as user story 4.
    As a student, I should be able to specify a 3-by-3 matrix, and then restrict the domain to a subspace of the Euclidean space. Then, I should see the new range (instead of the range in user story 6).
        I.e, Restricting the domain to a subspace spanned by vectors v1,v2, draw the subspace first, then to find out and draw the restricted range is equivalent to finding the span{ Av1, Av2}.


### Acknowledgements
We used the following tools to build our application:
- [threeJS](https://threejs.org/): a Javascript 3D library, used for to create our graphics
- [Numeric JS](http://www.numericjs.com/): Javascript library that helps with numerical computations
- [MathJax](https://www.mathjax.org/): Engine for displaying mathematical equations
- [Semantic UI](https://semantic-ui.com/): CSS library used in our user interface

The following pages were especially useful, when we were starting out with threeJS
- https://bocoup.com/blog/learning-three-js-with-real-world-challenges-that-have-already-been-solved

