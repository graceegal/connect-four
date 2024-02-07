"use strict";

beforeEach(function () {
  console.log("Run once before each test starts");

  // reset & make in-memory board
  board.length = 0;
  makeBoard();

  // reset & make html board
  let htmlBoard = document.getElementById('board');
  htmlBoard.innerHTML = "";
  makeHtmlBoard();

  // reset currPlayer
  currPlayer = 1;
});


describe('makeBoard', function () {

  it('makes the in-memory board', function () {
    expect(board.length).toEqual(HEIGHT);

    for (const row of board) {
      expect(row.length).toEqual(WIDTH);
    }
  });

  it('in-memory board rows should have unique identity', function () {
    const rows = new Set(board);
    expect(rows.size).toEqual(board.length);
  });
});


describe('makeHtmlBoard', function () {

  it('makes the html board', function () {
    let htmlBoard = document.getElementById('board');

    // num rows should be HEIGHT + 1 to account for clickable top row
    expect(htmlBoard.rows.length).toEqual(HEIGHT + 1);

    for (const tableRow of htmlBoard.rows) {
      expect(tableRow.cells.length).toEqual(WIDTH);
    }
  });
});


describe('findSpotForCol', function () {

  it('finds the next available spot in column', function () {
    const y = HEIGHT - 1;
    const x = 0;

    expect(findSpotForCol(x)).toEqual(y);

    board[y][x] = "filled";

    expect(findSpotForCol(x)).toEqual(y - 1);
  });

  it('returns null if column filled', function () {
    let y = 0;
    const x = 1;

    while (y < HEIGHT) {
      board[y][x] = "filled";
      y++;
    }

    expect(findSpotForCol(x)).toEqual(null);
  });
});


describe('placeInTable', function () {

  it('adds piece to the html board', function () {
    const x = 0;
    const y = HEIGHT - 1;
    const spot = document.getElementById(`c-${y}-${x}`);

    expect(spot.innerHTML).toEqual("")
    placeInTable(y, x);
    expect(spot.innerHTML).toEqual(`<div class="piece p${currPlayer}"></div>`)
  });
});


describe('checkForWin', function () {

  it('returns false if no winner', function () {
    expect(checkForWin()).toEqual(false);
  });

  it('returns true if there is a horizontal winner', function () {
    board[0][1] = 1;
    board[0][2] = 1;
    board[0][3] = 1;
    board[0][4] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a vertical winner', function () {
    board[1][0] = 1;
    board[2][0] = 1;
    board[3][0] = 1;
    board[4][0] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a diagonal winner', function () {
    board[1][1] = 1;
    board[2][2] = 1;
    board[3][3] = 1;
    board[4][4] = 1;

    expect(checkForWin()).toEqual(true);
  });
});

describe('handleClick', function () {

  it('it switches players', function () {
    const evt = {target: {id: "top-0"}};

    expect(currPlayer).toEqual(1);

    handleClick(evt);
    expect(currPlayer).toEqual(2);

    handleClick(evt);
    expect(currPlayer).toEqual(1);
  });

  it('it updates in-memory board with correct player', function () {
    let y = HEIGHT - 1;
    const x = 0;

    const evt = {target: {id: `top-${x}`}};

    // spot on board is empty
    // after one call to handleClick, gets updated with player 1
    expect(board[y][x]).toEqual(null);
    handleClick(evt);
    expect(board[y][x]).toEqual(1);

    // increment y to next unfilled row for x
    y = HEIGHT - 2;

    // spot on board is empty
    // after next call to handleClick, gets updated with player 2
    expect(board[y][x]).toEqual(null);
    handleClick(evt);
    expect(board[y][x]).toEqual(2);
  });

  it('it updates html board with correct pieces', function () {
    let y = HEIGHT - 1;
    const x = 0;

    let spot = document.getElementById(`c-${y}-${x}`);
    const evt = {target: {id: `top-${x}`}};

    // spot on html board empty
    // after one call to handleClick, gets updated with player 1 piece
    expect(spot.innerHTML).toEqual("")
    handleClick(evt);
    expect(spot.innerHTML).toEqual('<div class="piece p1"></div>')

    // increment y to next empty row for x
    // get new spot
    y = HEIGHT - 2;
    spot = document.getElementById(`c-${y}-${x}`);

    // spot on html board empty
    // after next call to handleClick, gets updated with player 2 piece
    expect(spot.innerHTML).toEqual("")
    handleClick(evt);
    expect(spot.innerHTML).toEqual('<div class="piece p2"></div>')
  });
});


describe('checkForWin', function () {

  it('returns false if no winner', function () {
    expect(checkForWin()).toEqual(false);
  });

  it('returns true if there is a horizontal winner', function () {
    board[0][1] = 1;
    board[0][2] = 1;
    board[0][3] = 1;
    board[0][4] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a vertical winner', function () {
    board[1][0] = 1;
    board[2][0] = 1;
    board[3][0] = 1;
    board[4][0] = 1;

    expect(checkForWin()).toEqual(true);
  });

  it('returns true if there is a diagonal winner', function () {
    board[1][1] = 1;
    board[2][2] = 1;
    board[3][3] = 1;
    board[4][4] = 1;

    expect(checkForWin()).toEqual(true);
  });
});