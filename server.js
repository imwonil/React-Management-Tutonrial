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
 user: conf.user ,
 password: conf.password,
 port: conf.port,
 database: conf.database

});
connection.connect();
const multer =require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res) => {
   connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {

      res.send(rows);
    }

   );
});
app.use ('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
 let sql = 'INSERT INTO CUSTOMER VALUES ( null, ?, ?, ?, ?, ?)';
 let image = '/image/' + req.file.filename;
 let name =req.body.name; 
 let birthday =req.body.birthday;  
 let gender =req.body.gender;   
 let job =req.body.job;
  let params = [image, name, birthday, gender, job];  
 connection.query(sql, params,
   (err, rows, fields) => {
    res.send(rows);
    //console.log(err); 의심되는
    /// console.log(rows); 경우 확인 할 수 있다.
   });

});
app.listen(port,()=>console.log(`listening on port ${port}`)) 