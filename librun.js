function toString(obj) {
	return JSON.stringify(obj);
}

var debug = function(obj) {
	console.log(toString(obj));
}


module.exports = debug;
