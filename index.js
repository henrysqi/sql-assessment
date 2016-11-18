var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:pgadminpass@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
     app.set('db', db);
    
     db.user_create_seed(function(){
       console.log("User Table Init");
     });
     db.vehicle_create_seed(function(){
       console.log("Vehicle Table Init")
     });
	
})

//1
app.get('/api/users', function(req, res, next){
	db.get_all_users(function(err, result){
		if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	})
})

//2
app.get('/api/vehicles', function(req, res, next){
	db.get_all_vehicles(function(err, result){
		if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	})
})

//3
app.post('/api/users', function(req, res, next){
	db.add_a_user([req.body.firstname, req.body.lastname, req.body.email], function(err, result){
		if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	})
})

//4
app.post('/api/vehicles', function(req, res, next){
	db.add_a_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, result){
		if (err){
			res.status(500).send(err);
		} else {
			res.send(result);
		}
	})
})

//5 @@@@@@@@@ status 200?
app.get('/api/user/:userId/vehiclecount', function(req, res, next){
	db.get_user_vehicle_count([Number(req.params.userId)], function(err, result){
		if (err){
			res.status(500).send(err);
		} else {
			res.send(result[0]);
		}
	})
})

//6
app.get('/api/user/:userId/vehicle', function(req, res, next){
	
})






































app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
