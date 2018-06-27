const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connect to local mongoDB
// mongoose.connect(process.env.MONGODB_URI);

//Connect to mongoAtlas
mongoose.connect(
    `mongodb+srv://hitesh:${process.env.MONGOATLAS}@archr-s7d4t.gcp.mongodb.net/test?retryWrites=true`
);

module.exports = {mongoose};
