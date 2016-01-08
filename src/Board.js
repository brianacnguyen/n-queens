// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // use this.get(1) to get first row [0,0,1,0] 
    // no method to get collumn, board.get(1)[0] = best bet
    // board.togglePiece(1,1) = place piece onto board at row 1 collumn 1
    // no solution for 2x2 or 3x3. need to return false/undefined/0/w.e
    // to test the number of solutions for queens
    // 1 = 1, 2/3 = 0, 4 = 2, 5 = 10, 6 = 4, 7 = 40, 8 = 92
    
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // for loop each item in array 
      // create count, if count exceeds 1, return false
      var count = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count ++;
        }
      }
      return (count > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //declare a truthy variable
      var totalRows = this.rows();
      var result = false;
      //access all rows via rows function, store
      //loop over each array in rows
        //call hasrowconflict at on each array
          //if it returns true
      for (var i = 0; i < totalRows.length; i ++) {
        if (this.hasRowConflictAt(i)) {
          result = true;
        }
      }

      // _.each(totalRows, function(row){
      //   if (this.hasRowConflictAt(index)){
      //     result = true;
      //   }
      // })

      return result;
      // return _.some(totalRows, function() {
      //   this.hasRowConflictAt});
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //loop over each element when using board.get to see if they match
    hasColConflictAt: function(colIndex) {
      //[0,    0,   0,   0,   0,   0,   0,     0,    0,     0]
      //col0 col1 col2 col3 col4 col5  col6  col7   col8   col9
      //create a totalrows variable -> stores all rows
      //loop over each index of totalRows
      //check the col index element of that array
      var totalRows = this.rows();
      var count = 0;

      for (var i = 0; i < totalRows.length; i ++) {
        if (totalRows[i][colIndex] === 1) {
          count ++;
        }
      }

      return (count > 1); 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var totalRows = this.rows();
      var result = false; 
      for (var i = 0; i < totalRows.length; i++) {
        if (this.hasColConflictAt(i)) {
          result = true;
        }
      }
      //declare totalRows
      // set result to false
      // for loop and change to collumn conflict
      return result; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // check for rowindex and collumn index (row[i])
    // decrements/increments both until it reaches n or 0
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndex, majorDiagonalRowIndex) {
      /*
    row    0  1  2  3   col
    0     [0, 0, 0, 0],
    1     [0, 0, 0, 0],
    2     [1, 0, 0, 0],
    3     [0, 1, 0, 0]
      majorDiagonalColumnIndexAtFirstRow = 1 ???
      */
      majorDiagonalRowIndex = majorDiagonalRowIndex || 0;
      // (majorDiagonalRowIndex === undefined) ? 0 : majorDiagonalRowIndex;
      var totalRows = this.rows();
      var count = 0;
      var result = false;
      var check = function(c,r) {
        if (r === totalRows.length || c === totalRows.length) {
          return result;
        }
        if (totalRows[r][c] === 1) {
          count++;
          if(count === 2) {
            result = true;
          }
        }
        check(c + 1, r + 1); 
      }
      check(majorDiagonalColumnIndex, majorDiagonalRowIndex);
      return result;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var totalRows = this.rows();
      var result = false; 
      for (var i = 0; i < totalRows.length; i++) {
        if ((this.hasMajorDiagonalConflictAt(i, 0)) || (this.hasMajorDiagonalConflictAt(0, i))) {
          result = true;
        }
      }
        //run hasMDCAt on all elements in first row.
        //run hasMDCAT on the 0 column on all the other rows.
      return result; // fixme
    },

 // row       0  1  2  3  col
 //    0     [0, 0, 0, 0],
 //    1     [0, 0, 0, 0],
 //    2     [1, 0, 0, 0],
 //    3     [0, 1, 0, 0]

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndex, minorDiagonalRowIndex) {
      
      minorDiagonalRowIndex = minorDiagonalRowIndex || 0;
      // (minorDiagonalRowIndex === undefined) ? 0 : minorDiagonalRowIndex;
      var totalRows = this.rows();
      var count = 0;
      var result = false;
      var check = function(c,r) {
        if (r === totalRows.length || c === -1) {
          return result;
        }
        if (totalRows[r][c] === 1) {
          count++;
          if(count === 2) {
            result = true;
          }
        }
        check(c - 1 , r + 1); 
      }
      check(minorDiagonalColumnIndex, minorDiagonalRowIndex);
      return result;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var totalRows = this.rows();
      var result = false; 
      for (var i = (totalRows.length - 1); i >= 0; i--) {
        if ((this.hasMinorDiagonalConflictAt(i, 0)) || (this.hasMinorDiagonalConflictAt((totalRows.length - 1), i))) {
          result = true;
        }
      }
        //run hasMDCAt on all elements in first row.
        //run hasMDCAT on the 0 column on all the other rows.
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
