
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

// Routes that will be just for rendering pages
var calendar1 = require('./routes/calendar');
var create_event = require('./routes/create_event');
var gruupers_page = require('./routes/gruupers');
var help_page = require('./routes/help');
var setupEventScreen = require('./routes/login');
var signEventScreen = require('./routes/signup');
var home = require('./routes/homepage');
var settingsPage = require('./routes/settings');
var tutorial1 = require('./routes/tutorialOne');
var tutorial2 = require('./routes/tutorialTwo');
var tutorial3 = require('./routes/tutorialThree');
var tutorial4 = require('./routes/tutorialFour');
var eventModal = require('./routes/processEventModal');

// Routes to transmit and access data
var processNewEvent = require('./routes/processNewEvent');
var processLogin = require('./routes/processLogin');
var putEvents = require('./routes/putEvents');
var sub = require('./routes/submit');
var addFriend = require('./routes/processAddFriend');
var gruupUp = require('./routes/gruupUp');

var mongoose = require('mongoose');
var connect_mongo = require('connect-mongo')(express);


//var local_database_name = 'cogs120g2'
var local_database_uri  = 'mongodb://steven:hello@ds045021.mongolab.com:45021/heroku_app33594023';
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

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
}


// Routes to render pages
server.get('/', setupEventScreen.setup);
server.get('/calendar', calendar1.cal);
server.get('/homepage', home.main);
server.get('/createEvent', create_event.create);
server.get('/gruupers', gruupers_page.gruup);
server.get('/help', help_page.helpList);
server.get('/signup', signEventScreen.sign);
server.get('/settings', settingsPage.setting);
server.get('/gruupUp', gruupUp.view);
server.get('/tutorialOne', tutorial1.tutorialone);
server.get('/tutorialTwo', tutorial2.tutorialtwo);
server.get('/tutorialThree', tutorial3.tutorialthree);
server.get('/tutorialFour', tutorial4.tutorialfour);
server.get('/about', setupEventScreen.about);

// Routes to process and send information 
server.get('/putEvents', putEvents.onCal);
server.get('/retrieveEvents', putEvents.getEvents);
server.post('/processNewEvent', processNewEvent.processEvent); 
server.post('/newPost', sub.signup);
server.post('/processLogin', processLogin.authenticate);
server.post('/processAddFriend', addFriend.add);
server.post('/processGruupUp', gruupUp.calculate);
server.post('/processEventModal', eventModal.processAction);
server.post('/processDeleteFriend', addFriend.deleteFriend);
server.post('/processSettingsNames', settingsPage.updateNames);
server.post('/processSettingsPass', settingsPage.updatePass);

// Start the server
http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});
