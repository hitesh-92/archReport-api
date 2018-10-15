const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const siteLogRoutes = require('./api/routes/siteLog');
const columnRoutes = require('./api/routes/column');
const userRoutes = require('./api/routes/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','*');

//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods',
//             'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});

//     }

//     next();
// });

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Allow-Control-Allow-Headers','*');
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();  
// });

app.use('/logs', siteLogRoutes);
app.use('/column', columnRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({error: 'Error - not found'});
    next(error);
});

module.exports = app;
