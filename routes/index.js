var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Table Planner',
  	data: ['Table Planner outputs show here']
	});
});
module.exports = router;

//-------------child-process---------------
function planner(cb){
	var sys = require('sys');
	var exec = require('child_process').exec;
	var planner_output="";
	child = exec('./cpp_src/tableplanner', function(error, stdout, stderr){
    // result
    if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
     console.log('Signal received: '+error.signal);
   	}
   	console.log('Child Process STDOUT: '+stdout);
   	var out_array = stdout.split(/\n/);
   	cb(out_array);
	});
}

router.get('/planner', function(req, res){
	planner(function(planner_output){
		res.render('index', { 
			title: 'Table Planner Outputs:',
			data: planner_output 
		});
	});
});



