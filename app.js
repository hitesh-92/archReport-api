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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }

    next();
});


app.use('/logs', siteLogRoutes);
app.use('/users', userRoutes);

// app.get('/', (req, res) => {
//     res.send('hello')
// });

app.use((req, res, next) => {
    // const error = new Error('ERROR - not found');
    res.status(404).json({error: 'Error - not g found'});
    next(error);
});

module.exports = app;