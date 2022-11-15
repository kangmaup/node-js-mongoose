const express = require("express");
const route = express.Router();


route.get('/',(req, res, next)=>{

    usersDBAccess.getByID(req);    

})

route.get('/',(req, res, next)=>{

    const contextObject={
        user: req.user,
        transactionId : UUID.new(),
        otherProperties : 'Some Other Properties'
    };    

    new DAL(contextObject),
    usersDBAccess.getByID(1);

})