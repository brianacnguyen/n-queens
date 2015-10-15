/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// array of arrays = array with equal length with each bucket having equal length
// find rooks = similar to rock paper scissor with conditionals of rows and collumns (using the functions from board.js)
// find queens = similar but with conditionals of rows and collumns and diagonals 

window.findNRooksSolution = function(n) {
  var newBoard = new Board({n: n});
  var rowIndex = 0;
  var columnIndex = n - 1;
  //for loop
  for (var i = 0; i < n; i++) {
    newBoard.togglePiece(rowIndex,columnIndex);
    rowIndex += 1; 
    columnIndex -= 1;
  }
  /*
  [0,0,1]
  [0,1,0]
  [1,0,0]
  */
  var totalRows = newBoard.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(newBoard));
  return totalRows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
}



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
