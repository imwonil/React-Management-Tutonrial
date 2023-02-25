const fs= require('fs');
const express = require('express');
const bodyParser = require('body-parser');  //서버모듈을위한 
const app = express();
const port = process.env.PORT || 5000;  
const { createProxyMiddleware } = require('http-proxy-middleware'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection =mysql.createConnection({
 host: conf.host,
 user: conf.user,
 password: conf.password,
 port: conf.port,
 database: conf.database

});

app.get('/api/customers', (req, res) => {
   connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {

      res.send(rows);
    }

   );
});

app.listen(port,()=>console.log(`listening on port ${port}`))