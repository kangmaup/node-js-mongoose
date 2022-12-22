const { Sequelize } = require("sequelize");
const { envConfig } = require("./app.config");
const dotenvParseVariables = require('dotenv-parse-variables');

const parseENV = dotenvParseVariables(envConfig);
console.log(parseENV);
exports.postgre = new Sequelize(parseENV.APP_DATABASE,parseENV.DB_USERNAME,parseENV.DB_PASSWORD,{
    host : 'localhost',
    port : parseENV.DB_PORT,
    dialect : parseENV.DB_DIALECT,
    logging: parseENV.DB_LOG,
    sync: parseENV.DB_SYNC    
});
