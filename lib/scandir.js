var fs = require('fs');
module.exports = function(dir, ignores){
	ignores = ignores || [];
	var fileList = [];
	walk(dir);
	function walk(path) {
		var files = fs.readdirSync(path);	
		files.forEach(function(item){
			var tempPath = path + '/' + item;
			if(ignores.indexOf(item) != -1) return;
			var status = fs.statSync(tempPath);
			if(status.isDirectory()) {
				walk(tempPath);
			} else {
				fileList.push(tempPath);
			}
		});
	}
	return fileList;
};