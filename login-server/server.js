// Express
var express = require("express");
var app = express();

// Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Session
var session = require("express-session");
app.use(session({
	secret: 'keyboard cat', // secret key
	resave: false, // default value
	saveUninitialized: true, // saves empty objects
	cookie: {
		//maxAge: 10000 // = 10 seconds
	}
}));

app.post("/login", function(req, res) {
	if (req.body.username === "erty" &&
		req.body.password === "1234") {
		req.session.loggedin = true;
		res.send("success");
	} else {
		res.send("error");
	}
});

app.post("/logout", function(req, res) {
	req.session.loggedin = false;
	res.send("success");
});

app.get('/secret', function(req, res) {
	// Guard against not logged in users
	if (!req.session.loggedin) {
		res.redirect("/");
		return;
	}

	res.send("This is the secret! Cats are good.");
});

// Serve Static Files
app.use(express.static('public'));

// 404 Middleware
app.use(function(req, res, next) {
	res.status(404);
	res.send("404 File Not Found ... :( ");
});

// 500 Middleware
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Internal server error... D:");
});


// Actually Start the Server
app.listen(8080, function() {
	console.log("ok you have a server :)");
});
