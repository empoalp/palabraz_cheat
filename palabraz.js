var fs = require('fs');

var palabras = fs.readFileSync('palabras.txt').toString().split('\n');
var la = process.argv[2].split('');
var pl = {};
for (var i=0; i < palabras.length; i++) {
	var word = palabras[i];
	var ws = word.split('');
	var temp = pl;
	for (var j=0;j < ws.length; j++) {
		temp.count = temp.count || 0;
		temp.count++;
		temp[ws[j]] = temp[ws[j]] || {};
		temp = temp[ws[j]];
	}
	temp.match = true;
}

var moves = [
	[1,4,5], [0,2,4,5,6],[1,3,5,6,7],[2,6,7],
	[0,1,5,8,9], [0,1,2,4,6,8,9,10], [1,2,3,5,7,9,10,11],[2,3,6,10,11],
[4,5,9,12,13],[4,5,6,8,10,12,13,14],[5,6,7,9,11,13,14,15],[6,7,10,14,15],
	[8,9,13], [12,8,9,10,14], [9,10,11,13,15], [14,10,11]
];

function findWord(visited, found) {
	var m, mt, tmp = pl, word=[];

	if (visited.length === 0) {
		m = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	}else{
		mt = moves[visited[visited.length-1]];
		m=[];
		for (var i=0; i < mt.length; i++) {
			m[i] = mt[i];
		}
		for (var i=0; i < visited.length; i++) {
			var j = m.indexOf(visited[i]);
			tmp = tmp[la[visited[i]]];
			word.push(la[visited[i]]);
			if (j >= 0) {
				m.splice(j,1);
			}
		}
	}

	for (var i=0; i<m.length; i++) {
		visited.push(m[i]);
		word.push(la[m[i]]);
		if (tmp[la[m[i]]]) {
			if (tmp[la[m[i]]].match && word.length > 2 &&
				found.indexOf(word.join('')) < 0) {
				found.push(word.join(''));
			}
			findWord(visited, found);
		}
		word.pop();
		visited.pop();	
	} 
}

var found = [];
findWord([], found);
found.sort(function(a,b) {
	return b.length - a.length;
});
console.log(found);
