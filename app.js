const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./db/mongoose');

const siteLogRoutes = require('./api/routes/siteLog');
const userRoutes = require('./api/routes/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/logs', siteLogRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('hello')
});

app.use((req, res, next) => {
    const error = new Error('ERROR - not found');
    res.status(404).json({error: 'ERROR!!!!!!'});
    next(error);
});

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: { message : error.message}
//     });
// });

module.exports = app;