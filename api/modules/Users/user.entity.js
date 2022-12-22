const { DataTypes, Model } = require("sequelize");
const { postgre } = require("../../../config/postgre.config");
const bcrypt = require('bcryptjs');
const { blogEntity } = require("../Blog/blog.entity");


const userEntity = postgre.define('User',{

    name: {
        type: DataTypes.STRING,
        require: true
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
        require:true
    },
    password:{
        type: DataTypes.STRING,
        require: true
    },
    refreshtoken:{
        type: DataTypes.STRING,
        unique:true
    }


},
{
    instanceMethods:{
        hashPassword: (password,res)=>{
            bcrypt.hash(password,this.getDataValue('password'),(err,isHash)=>{
                if(err) return res(err);
                res(null,isHash)
            })
        }   
    }
});

userEntity.hasMany(blogEntity,{
    foreignKey: 'author'
});
blogEntity.belongsTo(userEntity,{
    foreignKey: 'author'
})

module.exports = {userEntity};

