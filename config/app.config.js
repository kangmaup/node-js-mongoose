const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const filePath = `${process.env.NODE_ENV || 'development'}.env`;
const envFile = path.resolve(__dirname, '../','.env');
exports.envConfig = dotenv.parse(fs.readFileSync(envFile));


   
  

 