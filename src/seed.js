var fill = function (min=1, max=8) {
  var min = Math.ceil(min);
  var max = Math.floor(max);

  // The maximum is exclusive and
  // The minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

var range = function (start=1, edge=8, step=1) {
	// If only one number was passed in make it the edge and 0 the start.
	if (arguments.length == 1) {
		edge = start;
		start = 0;
	}

	// Validate the edge and step numbers.
	edge = edge || 0;
	step = step || 1;

	// Create the array of numbers, stopping befor the edge.
	for (var ret = []; (edge - start) * step > 0; start += step) {
		ret.push(start);
	}

	return ret;
}

var grid = [
    // [1,2,3,4],

    // [1,2],
    // [3,4],
    // [5,6],

    // [1],
    // [2],
    // [3],
    // [4],

    // [1,2],
    // [3,4],

    // [1,2,3],
    // [4,5,6],
    // [7,8,9],

    // [8,7,1,3,1,1,1,1,1,1,1,1,1,1,1,1],
    // [4,1,5,2,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
    [fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill(),fill()],
];

fs = require('fs');

var range = (x=0, y=1) => {
	if (x > y) {
		return range(y, x).reverse();
	}

	return x === y ? [y] : [x, ...range(x + 1, y)];
}

var path = file => 'static/assets/tile/omega-' + file + '.csv';

var tiles = range(1, 8).map(tile => fs.readFileSync(path(tile), 'utf8'));

var csvToArray = function(cell) {
	return tiles[cell]
		.replace(/\n$/, '')
		.split('\n')
		.map(x => x.split(','));
};

var tilemap = grid.map(row => row.map(csvToArray));

console.log(tilemap);

// tilemap
// [w]          = 
// [w][x]       = 
// [w][x][y]    = 
// [w][x][y][z] = 

var tilemap_height = tilemap.length;
var tilemap_width = tilemap[0].length;

var cell_height = tilemap[0][0].length;
var cell_width = tilemap[0][0][0].length;

var total_height = cell_height * tilemap_height;
var total_width = cell_width * tilemap_width;

console.log(tilemap_height, tilemap_width);
console.log(cell_height, cell_width);
console.log(total_height, total_width);

var csv = "";
// load row 1 THEN
// load cell 1 and then line 1 and print it
// load cell X and then line 1 and print it
// load cell 2 and then line 2 and print it
// load cell X and then line 2 and print it...
// load row 2 THEN
// load cell 1 and then line 1 and print it
// load cell X and then line 1 and print it
// load cell 2 and then line 2 and print it
// load cell X and then line 2 and print it...
// ...Fin?

console.log(tilemap, tilemap.length);
console.log('---');
console.log();

var line = 0;

// TILEMAP-ROW
for (var i = 0; i < tilemap_height; i++) {
	// console.log(tilemap[i], tilemap[i].length);
	// console.log();

	for (var j = 0; j < tilemap_width; j++) {
		// console.log(tilemap[i][j]);
		console.log();

		for (var k = 0; k < cell_height; k++) {
			// console.log(tilemap[i][j][k]);
			console.log(tilemap[i][k][j].toString(), i, j, k, line, tilemap_width);

			csv += tilemap[i][k][j].toString();

			if (k == tilemap_width-1) {
				csv += '\\n';
			}
			else {
				csv += ',';
			}

			if (line < tilemap_width) {
				line++;
			}
			else {
				line = 0;
			}
		}
	}

	// break;
}

fs.writeFileSync('src/seed.csv', csv, 'utf8');
