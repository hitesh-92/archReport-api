const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connect to local mongoDB
// mongoose.connect(process.env.MONGODB_URI);

//Connect to mongoAtlas
// mongoose.connect(`mongodb+srv://hitesh:W8fSeRuW7M2BKuBL@archr-s7d4t.gcp.mongodb.net/test?retryWrites=true`);

mongoose.connect(`mongodb://hitesh:W8fSeRuW7M2BKuBL@archr-shard-00-00-s7d4t.gcp.mongodb.net:27017,archr-shard-00-01-s7d4t.gcp.mongodb.net:27017,archr-shard-00-02-s7d4t.gcp.mongodb.net:27017/test?ssl=true&replicaSet=archR-shard-0&authSource=admin&retryWrites=true`);

module.exports = {mongoose};

