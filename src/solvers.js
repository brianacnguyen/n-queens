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
window.findSolution = function(row, n, board, validator, callback) {
  if (row === n) {
    return callback();
  }
  for (var i = 0; i < n; i++) {
    board.togglePiece(row,i);
    if(!board[validator]()) {
      var result = findSolution(row+1, n, board, validator, callback);
      if(result) {
        return result;
      }
    }
    board.togglePiece(row,i);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var solution = findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var board = new Board({n:n});

  findSolution(0, n, board, "hasAnyRooksConflicts", function(){
    solutionCount++
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows(); //fixme
  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solution = _.map(board.rows(), function(row){
      return row.slice();
    })
  })
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
