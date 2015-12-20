var express = require('express'),
	app = express(),
	router = require('./controllers/routes').router,
	http = require('http').createServer(app);

app.use('/',router);

http.listen(process.env.PORT||3000);