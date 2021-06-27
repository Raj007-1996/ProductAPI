const express = require('express');
const Product = require('./Product')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/product',Product);


app.listen(3000,()=>{
    console.log("Listening at port 3000");
});

