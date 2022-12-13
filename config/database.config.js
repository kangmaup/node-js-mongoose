const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/app_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
exports.mongoDB = mongoose.connection;


