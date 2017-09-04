var fill = function (min=1, max=8) {
  var min = Math.ceil(min);
  var max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var grid = [
    [1,2],
    [1,2],
];

fs = require('fs');

var tilemap = grid.map(function(row) {
	return row.map(function(cell) {
		var ccc = fs
			.readFileSync('static/assets/tile/alt-'+cell+'.csv', 'utf8')
			.replace(/\n$/, '')
			.split('\n')
			.map(function(x) {
				return x.split(',');
			});

		console.log(ccc);
		return ccc;
	});
});

console.log(tilemap);

// tilemap
// [w]          = 
// [w][x]       = 
// [w][x][y]    = 
// [w][x][y][z] = 

var row_height = tilemap.length;
var row_width = tilemap[0].length;

var cell_height = tilemap[0][0].length;
var cell_width = tilemap[0][0][0].length;

var total_height = cell_height * row_height;
var total_width = cell_width * row_width;

console.log(row_height, row_width);
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
// 

console.log(csv);

// fs.writeFileSync('src/seed.csv', csv, 'utf8');
