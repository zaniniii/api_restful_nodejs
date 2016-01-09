var app = require('./config/app_config.js');

//Routes
var users = require('./routes/users');
var login = require('./routes/login');

//URL's
app.use('/users', users);
app.use('/login', login);
