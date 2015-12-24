var app = require('./config/app_config.js');


var users = require('./routes/users');
app.use('/users', users);
