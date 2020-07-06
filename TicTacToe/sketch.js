var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

var available = [];
var activate_x = false;
var someoneWon = false;

function setup() {
  createCanvas(300, 400);
  background(200);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      available.push([i, j]);
    }
  }
  //noLoop();
}

function draw() {
  background(0);
  stroke(255);
  line(0, 100, 300, 100);
  line(0, 200, 300, 200);
  line(100, 0, 100, 300);
  line(200, 0, 200, 300);
  line(0, 300, 300, 300);
  for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'X') {
          line(20+100*j, 20+100*i, 80+100*j, 80+100*i);
          line(80+100*j, 20+100*i, 20+100*j, 80+100*i);
        } else if (board[i][j] === 'O') {
          ellipse(50+100*j, 50+100*i, 60, 60);
        }
      }
  }
  fill(0);
  textSize(30);
  var winner = getWinner();
  if (winner != "Unentschieden") {
    text("Winner: " + winner[0], 80, 350);
    var gw1 = winner[1];
    var gw2 = winner[2];
    var richtung = winner[3];
    strokeWeight(6);
    if (richtung == "dv") {
      line(20, 20, 280, 280);
    } else if (richtung == "dr") {
      line(280, 20, 20, 280);
    } else if (richtung == "h") {  // horizontal
      line(20, 50+100*gw1, 80+200, 50+100*gw1);
    } else if (richtung == "v") {  // vertikal
      line(50+100*gw2, 20, 50+100*gw2, 80+200);
    }
    someoneWon = true;
    noLoop();
    print("bazzz");
  } else if (isFullyOccupied(board)) {
    text(winner, 80, 350);
    someoneWon = true;
    noLoop();
  }
}

function mousePressed() {
  if (!someoneWon) {
    if (available.length > 0) {
      do {
        var random_x = floor(random() * 3);
        var random_y = floor(random() * 3);
      } while (board[random_x][random_y] != '');
      if (activate_x) {
        board[random_x][random_y] = 'X';
        activate_x = false;
      } else {
        board[random_x][random_y] = 'O';
        activate_x = true;
      }
      available.splice(itemIsInArray(available, [random_x, random_y]), 1);
    }
  }
}

function getWinner() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (equals3(board[i][j], board[i][(j + 1) % 3], board[i][(j + 2) % 3])) {
        return [board[i][j], i, j, "h"];
      } else if (equals3(board[i][j], board[(i + 1) % 3][j], board[(i + 2) % 3][j])) {
        return [board[i][j], i, j, "v"];
      } else if (equals3(board[0][0], board[1][1], board[2][2])) {
        return [board[0][0], 0, 2, "dv"]; // diagonal vorwaerts
      } else if (equals3(board[0][2], board[1][1], board[2][0])) {
        return [board[0][2], 0, 2, "dr"]; // diagonal rueckwarts
      }
    }
  }
  return "Unentschieden";
}

function isFullyOccupied(board) {
  for(var i =0; i<board.length; i++) {
    for(var j=0; j<board[i].length; j++) {
      if (board[i][j] === '') {
          return false;
      }
    }
  }
  return true;
}
// gibt true zurueck wenn a,b und c gleich sind
function equals3(a, b, c) {
  return (a == b && b == c && a == c && a != "");
}

// gibt index zurueck an dem item in array ist
function itemIsInArray(array, item) {
  for (var i = 0; i < array.length; i++) {
    if ((array[i][0] == item[0]) && (array[i][1] == item[1])) {
      return i;
    }
  }
}
