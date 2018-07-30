# v3ctor - Linear algebra visualised

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

### Milestone 3 Key Updates
  - Added 3 big features
    - The application now renders equations using LaTeX
    - Interactive linear transformation: When you visit the page, you will notice a white vector on the grid. This vector can be dragged freely by dragging
      the sphere on the vector's arrowhead. Simply enter any matrix into the "Matrices" form, and drag this domain vector. The image vector is drawn
      as you drag. 
    - "Plotter" functionality: Enter any Cartesian Equation, and see the corresponding plane drawn on the grid. You can also find intersections between 
       points/lines/planes
  - Added Minor features 
    - Tidied up the user interface
    - Added ability to delete single graphics, or clear all graphics drawn
    - Added an opacity slider to regulate the grid's opacity, and a performance monitor that tracks the frames per second
  - Bugs squashed: We reviewed bugs encountered during our meetings, and tracked them on Google Docs
    Known remaining bugs
    - Rotation along x, y, z axis no longer occur along the correct axes in some cases (still isolating the exact cases)
   
### User Acceptance Test
We have created a survey for users, which includes a checklist of common tasks that can be done with our application.
Users will try to accomplish each task, and then give us their feedback on the experience. 

Please help us complete the survey at: https://goo.gl/forms/uoZUBDp3GQWbu9oZ2
### Full list of User Stories

*All animations, vectors and vector spaces will be plotted on a 3D grid representing the Euclidean space.

The current version can be accessed [here](https://visual-vector.firebaseapp.com/)

Below are our user stories.

Admin / user interface
	
    As a student, I should be able to rotate the 3D grid and the lines / planes / vector drawn on it. (done)
    After rotating the grid, I should be able to reset the camera to a default view. (done) 
    As a student, I should have a button to let the 3d grid rotate about its own axis automatically. (done)
    As a student, I should see the coordinates of vectors  / spans when I hover the mouse over them. 
    Features should be intuitive for users, using tooltips to provide guidance. (done, pending feedback)
    Preserve session state - preserve a user's work when he / she refreshes or revists the page. (incomplete)

Vectors
	
    As a student, I should be able to input a specific vector and view its geometric representation. (done)
    As a student, I should be able to specify a linear combination of some vectors of my choice, and watch an animation constructing the resultant vector. (done)
    As a student, I should be able to hide / unhide vectors / spans on the grid using checkboxes (done)

Spans
	

    As a student, I should be able to specify a set of vectors and see a visual representation of the span of this set of vectors (either a line, plane or the whole space). (done)
    I should be able to watch a simple animation of the span being constructed. (feature dropped)
    [Continuing from above] Next, I should be able to pick out a particular vector within the span and find out how this vector can be expressed in terms of the vectors I originally specified. If the vectors specified are LI, it should alert the user that the inputs are invalid. (feature dropped)
    As a student, I should see the equations of lines and planes that are drawn for me. (done)

Matrices
	

    As a student, I should be able to specify a 3-by-3 matrix A and a vector X, 
    and see the resultant vector AX on the 3D grid. (done)
    As a student, I should be able to drag the vector X freely, and see the vector AX being 
    created immediately as I drag vector X. (done)
    As a student, I should be able to specify a 3-by-3 matrix, and see the eigenspaces, range and nullspace of this matrix.        Visualising the range is the same as user story 4. (done)
    As a student, I should be able to specify a 3-by-3 matrix, and then restrict the domain to a subspace of the Euclidean space. Then, I should see the new range (instead of the range in user story 6). (done)
        I.e, Restricting the domain to a subspace spanned by vectors v1,v2, draw the subspace first, then to find out and draw the restricted range is equivalent to finding the span{ Av1, Av2}. 

Plotter
	
    As a student, I should be able to specify a single Cartesian equation, and see the corresponding 
    plane drawn on the grid. (done)
    As a student, I should be able to specify a few planes / lines / points and ask for the intersections 
    of my selected objects to be drawn (done)


### Challenges Faced
- We wanted to use the browser's local storage to save the user's work. Currently, we are facing challenges in 
  saving the threejs graphics in a format suitable for this purpose. 
  
### Future Extensions
- Ability to "chain" multiple matrices, and decompose an invertible matrix into a "chain" of elementary matrices
This would allow users to visualise matrix compositions. 

### Acknowledgements
We used the following tools to build our application:
- [threeJS](https://threejs.org/): a Javascript 3D library, used for to create our graphics
- [Numeric JS](http://www.numericjs.com/): Javascript library that helps with numerical computations
- [MathJax](https://www.mathjax.org/): Engine for displaying mathematical equations
- [Semantic UI](https://semantic-ui.com/): CSS library used in our user interface

The following pages were especially useful, when we were starting out with threeJS
- https://bocoup.com/blog/learning-three-js-with-real-world-challenges-that-have-already-been-solved

