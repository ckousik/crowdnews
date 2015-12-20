var express = require('express'),
	app = express(),
	router = require('./controllers/routes').router,
	storyRouter = require('./controllers/story-router').router,
	http = require('http').createServer(app);

app.use('/',router);
app.use('/story',storyRouter);

http.listen(process.env.PORT||3000);