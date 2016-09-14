var app = require('./config/app.js');

//Routes
var index = require('./routes/index'),
    login = require('./routes/login'),
    users = require('./routes/users');

//URL's
app.use('/', index);
app.use('/login', login);
app.use('/users', users);
