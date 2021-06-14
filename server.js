require('rootpath')();
const express = require('express');
// var config = require('./configs/config');
const app = express();
const cors = require('cors');
var loginroutes = require('./routes/loginroutes');
var securedRoutes = require('./routes/securedRoutes');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(cors());

var router = express.Router();

app.use('/secured',securedRoutes);
app.use('/login', loginroutes);

// router.post('/register',loginroutes.register);
// router.post('/login',loginroutes.login);
// api routes
// app.use('/users', require('./users/user.controller'));
// app.use('/api', router);
// global error handler
// app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));