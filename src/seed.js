var fill = function(min=1, max=8) {
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
		cell_rows = cell_rows.slice(0, -1);
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





// content of index.js
const http = require('http');
const port = 3003;

const requestHandler = function(request, response) {
    // response.setHeader('Content-disposition', 'attachment; filename=seed.csv');
    // response.writeHead(200, { 'Content-Type': 'text/csv' });

    var stringy = '';

    for (var i = 0; i < latest.length; i++) {
    	for (var j = 0; j < latest[i].length; j++) {
    		stringy += latest[i][j] + '\\n';
    	}
    	// stringy += latest[i].join() + ',\n';

    	// stringy += latest[i].join() + ',\\n';
    }

    response.end(stringy);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
