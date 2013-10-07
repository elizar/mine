'use strict';
(function(w, undefined) {

  var Mine = {};
  if (!w.Mine || undefined === Mine) {
    w.Mine = Mine;
  }

  Mine.start = function(r, c) {
    Mine.board = [];
    for (var x = 0; x < r; x++) {
      var _row = [];
      for (var y = 0; y < c; y++) {
        var _column = Math.round(Math.random() * 2) === 0 ? 0 : 1;
        _row.push(_column);
      }
      console.log(_row);
      Mine.board.push(_row);
    }
  };

  /**
   * Select a piece of the Board
   *
   * @param {Number} r (row)
   * @param {Number} c (column)
   * @api public
   *
   */
  Mine.select = function(r, c) {
    var result = _getNumberOfMines(r, c);
    if (result === 'FAIL') {
      console.log('KABOOOOMMMM!!!!! MISSION FAIL!');
      return;
    }
    console.log('Number of Mines: ' + result);
  };

  /**
   * Get number of mines on the specified piece
   *
   * @param {Number} r (row)
   * @param {Number} c (column)
   * @return {Number} 0 or n (number of mines near)
   * @api private
   *
   */

  function _getNumberOfMines(r, c) {
    var _val = Mine.board[r][c];
    if (_val === 0) {
      return 'FAIL';
    }

    var _numOfMines = 0,
      _rBound = r === 0 ? true : false,
      _cBound = c === 0 ? true : false,
      _rBoundMax = r === Mine.board.length - 1 ? true : false,
      _cBoundMax = c === Mine.board[r].length ? true : false;

    /*
     * Setup Positions and Padding
     */
    var _point = {},
     _padding = {};
    _point.y = _rBound ? r : r - 1;
    _point.x = _cBound ? c : c - 1;
    _padding.y = _point.y + ((_rBound || _rBoundMax) ? 1 : 2);
    _padding.x = _point.x + ((_cBound || _cBoundMax) ? 1 : 2);

    for (var y = _point.y; y <= _padding.y; y++) {
      for (var x = _point.x; x <= _padding.x; x++) {
        if (Mine.board[y][x] === 0) {
          _numOfMines += 1;
        }
      }
    }

    return _numOfMines;

  }

  w.onload = function() {
    if (w.document.readyState === 'complete') {
      Mine.start(10, 10);
    }
  };

})(window);
