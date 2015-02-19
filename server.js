/**

 */
// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index1 = require('./routes/index');
var calendar1 = require('./routes/calendar');
var notificationsScreen = require('./routes/notifications');
var create_event = require('./routes/create_event');
var gruupers_page = require('./routes/gruupers');
var help_page = require('./routes/help');
var setupEventScreen = require('./routes/login');
var signEventScreen = require('./routes/signup');
var viewEventScreen = require ('./routes/profile');
var editSched = require ('./routes/editSchedule');
var settingsPage = require('./routes/settings');
var processNewEvent = require('./routes/processNewEvent');
var processLogin = require('./routes/processLogin');
var home = require('./routes/homepage');
var putEvents = require('./routes/putEvents');


var mongoose = require('mongoose');
var connect_mongo = require('connect-mongo')(express);
var sub = require('./routes/submit');
// Create the server instance
var server = express();

// Print logs to the console and compress pages we send
server.use(express.logger());
server.use(express.compress());

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
server.set('port', process.env.PORT || 3000);
server.set('views', path.join(__dirname, 'views'));
server.engine('handlebars', handlebars());
server.set('view engine', 'handlebars');
server.use(express.favicon());
server.use(express.json());
server.use(express.urlencoded());
server.use(express.methodOverride());
server.use(express.cookieParser());
server.use(express.session({
	secret: 'login_session'
}));
server.use(server.router);
server.use(express.static(path.join(__dirname, 'static')));


if ('development' == server.get('env')) {
  server.use(express.errorHandler());
  mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds045531.mongolab.com:45531/cogs120g2');
}

// Routes to render pages
server.get('/', setupEventScreen.setup);
server.get('/calendar', calendar1.cal);
server.get('/today', index1.view);
server.get('/homepage', home.main);
server.get('/notifications', notificationsScreen.screenView);
server.get('/createEvent', create_event.create);
server.get('/gruupers', gruupers_page.gruup);
server.get('/help', help_page.helpList);
server.get('/signup', signEventScreen.sign);
server.get('/profile', viewEventScreen.view);
server.get('/editSchedule', editSched.editSchedule);
server.get('/settings', settingsPage.setting);

// Routes to process and send information 
server.get('/putEvents', putEvents.onCal);
server.post('/processNewEvent', processNewEvent.processEvent); 
server.post('/newPost', sub.signup);
server.post('/processLogin', processLogin.authenticate);

// Start the server
http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});
