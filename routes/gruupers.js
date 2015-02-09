var data = require('../data.json');

exports.gruup = function(req, res){
	res.render('gruupers', data);
};