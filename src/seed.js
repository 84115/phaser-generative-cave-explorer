var fill = function (min=1, max=8) {
  var min = Math.ceil(min);
  var max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var grid = [
    [1,1,1],
    [2,2,2],
];

fs = require('fs');

var latest = grid.map(function(row) {
	return row.map(function(cell) {
		var cell_rows = '';

		cell_rows = fs.readFileSync('static/assets/tile/alt-'+cell+'.csv', 'utf8');
		// if (cell_rows.indexOf('\n') !== -1)
		// cell_rows = cell_rows.slice(0, -1);
		cell_rows = cell_rows.replace(/\n$/, '');
		// console.log('ROW', cell_rows);
		// cell_rows = cell_rows.replace('\n', '_\n');
		cell_rows = cell_rows.split('\n');
		// cell_rows = cell_rows.join();
		// cell_rows = cell_rows.replace('_', '\n');
		// cell_rows+= '\n';

		// cell_rows.push('\n');

		return cell_rows;
	});
});

console.log(latest);
console.log('');
var latest = latest.map(function(row) {
	for (var i = 0; i < row.length; i++) {
		for (var j = 0; j < row[i].length; j++) {
			row[i][j] = row[i][i];
		}

	}

	return row;
});
console.log('');
console.log(latest);



fs.writeFileSync('src/seed.csv', (function() {

	var stringy = '';

	for (var i = 0; i < latest.length; i++) {
		for (var j = 0; j < latest[i].length; j++) {
			stringy += latest[i][j] + '\n';
		}
	}

	return stringy.toString();

})(), 'utf8');
