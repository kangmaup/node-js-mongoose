const { DataTypes } = require("sequelize");
const { postgre } = require("../../../config/postgre.config");
const bcrypt = require('bcryptjs');


const blogEntity = postgre.define('Blog',{
    title:{
        type: DataTypes.STRING,
        require: true
    },
    author:{
        type:DataTypes.INTEGER,
        require: true
    },
    body:{
        type: DataTypes.TEXT
    },
    comments: {
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.DATE
    },
    is_deleted:{
        type: DataTypes.BOOLEAN
    }
})



module.exports = {blogEntity};