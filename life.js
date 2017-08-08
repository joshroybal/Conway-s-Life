// global variables
var grid = [ ];
for (var row = 0; row < 64; row++) {
    grid[row] = [ ];
}

var tmpgrid = [ ];
for (var row = 0; row < 64; row++) {
    tmpgrid[row] = [ ];
}

var x = [ ];
var dead = "<div class=\"white\"></div>";
var alive = "<div class=\"black\"></div>";
var n = 0;
var pop = 0;
var max = 0;
var min = 0;
var avg = 0;
var xvar = 0;

var id = setInterval(regenerate, 1000);
// var id;

// main processing function
function process()
{
    clearInterval(id);
    pioneer();
    id = setInterval(regenerate, 1000);
}

// grid next generation regeneration function
// Births and deaths accur according to the following rules:
// (a) An organism is born in any empty cell that has exactly three
//     neighbors.
// (b) An organism dies from isolation if it has fewer than two neighbors.
// (c) An organism dies from overcrowding if it has more than three
//     neighbors.
function regenerate()
{
    if (pop > 0) {
        for (var i = 0; i < 64; i++) {
            for (var j = 0; j < 64; j++) {
                var n = countneighbors(i, j);
                if (grid[i][j] == 0) {
                    if (n == 3)
                        tmpgrid[i][j] = 1;
                    else
                        tmpgrid[i][j] = 0;
                }
                else {
                    if (n < 2 || n > 3)
                        tmpgrid[i][j] = 0;
                    else
                        tmpgrid[i][j] = 1;
                }
            }
        }
        for (var i = 0; i < 64; i++)
            for (var j = 0; j < 64; j++)
                grid[i][j] = tmpgrid[i][j];
        // hmmm, the logical test seems to be cheaper than assignment?
        /* for (var i = 0; i < 64; i++)
            for (var j = 0; j < 64; j++)
                if (grid[i][j] != tmpgrid[i][j]) grid[i][j] = tmpgrid[i][j]; */
        drawgrid();
    }
}

// regenerate auxiliary function counts cell's no. of neighbors
function countneighbors(i, j)
{
    var n = 0;
    var row;
    var col;
    var firstrow = i - 1;
    var lastrow = i + 1;
    var firstcol = j - 1;
    var lastcol = j + 1;

    // check if going backwards/forwards one row or column takes you off the
    // grid
    if (i - 1 < 0) firstrow = 0;
    if (i + 1 >= 64) lastrow = 64 - 1;
    if (j - 1 < 0) firstcol = 0;
    if (j + 1 >= 64) lastcol = 64 - 1;
    // main neighbor counting loop
    for (row = firstrow; row <= lastrow; row++) {
        for (col = firstcol; col <= lastcol; col++) {
            if (grid[row][col] == 1) ++n;
        }
    }
    // decrement by 1 if cell occupied so that it will not be counted as its own
    // neighbor
    if (grid[i][j] == 1) --n;
    return n;
}

function drawgrid()
{
    var gridstring = "";
    pop = 0;
    for (var i = 0; i < 64; i++) {
        for (var j = 0; j < 64; j++) {
            if (grid[i][j] == 0)
                gridstring += dead;
            else {
                gridstring += alive;
                ++pop;
            }
        }
    }
    ++n;
    if (max < pop) max = pop;
    if (min > pop) min = pop;
    avg = ((n - 1) * avg + pop) / n;
    var dev = pop -avg;
    xvar = (((n - 1) * xvar) + dev * dev) / n;
    std = Math.sqrt(xvar);
    document.getElementById("square").innerHTML = gridstring;
    document.getElementById("run").innerHTML = "n = " + n;
    document.getElementById("pop").innerHTML = "pop = " + pop;
    document.getElementById("min").innerHTML = "min = " + min;
    document.getElementById("max").innerHTML = "max = " + max;
    document.getElementById("avg").innerHTML = "avg = " + avg;
    document.getElementById("dev").innerHTML = "dev = " + dev;
    document.getElementById("var").innerHTML = "var = " + xvar;
    document.getElementById("std").innerHTML = "std = " + std;
}

function pioneer()
{
    n = 0;
    // var s = Math.random();
    var s = 0.75;
    for (var row = 0; row < 64; row++)
        for (var col = 0; col < 64; col++) {
            var r = Math.random();
            if (r < s)
                grid[row][col] = 0;
            else
                grid[row][col] = 1;
        }


    var gridstring = "";
    pop = 0;
    for (var i = 0; i < 64; i++) {
        for (var j = 0; j < 64; j++) {
            if (grid[i][j] == 0)
                gridstring += dead;
            else {
                gridstring += alive;
                ++pop;
            }
        }
    }
    ++n;
    min = pop;
    max = pop;
    avg = pop;
    dev = pop - avg;
    xvar = 0;
    var std = 0;
    document.getElementById("square").innerHTML = gridstring;
    document.getElementById("run").innerHTML = "n = " + n;
    document.getElementById("pop").innerHTML = "pop = " + pop;
    document.getElementById("min").innerHTML = "min = " + min;
    document.getElementById("max").innerHTML = "max = " + max;
    document.getElementById("avg").innerHTML = "avg = " + avg;
    document.getElementById("dev").innerHTML = "dev = " + dev;
    document.getElementById("var").innerHTML = "var = " + xvar;
    document.getElementById("std").innerHTML = "std = " + std;
}
