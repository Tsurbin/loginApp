
 const Sequelize = require('sequelize');
 const config = require('../server/config');
 const path = require('path');
 const recursive = require('fs-readdir-recursive');
 const associations = require('./associations');

const basename = path.basename(__filename);
 
 
 const sequelize = new Sequelize(
     config.mysql.db,
     config.mysql.user,
     config.mysql.password,
     
     {
         host: config.mysql.host,
         port: config.mysql.port,
         dialect: 'mysql',
         define: {
             timestamps: false
         },
         pool:{
             max:20,
             min:1,
             idle: 3000
         }
         
     });
 
 const db= {};
 
 db.sequelize = sequelize;
 db.Sequelize = Sequelize;
 
 let apiPath = path.resolve('logInApp');
 

 recursive(apiPath).filter(function(file){
     return (file.indexOf("Model.js")>-1);
 }).forEach(function (file) {
     const model = require(path.join('..','logInApp', file))(sequelize, Sequelize.DataTypes);
     db[model.name] = model;
 });

 
 associations(db);
 module.exports = db;