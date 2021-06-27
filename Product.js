const express = require('express');
const router = express.Router();
const db = require('./Database');


router.get('/allProducts',(req,res)=>{
    db.query("select * from products", (err, data)=>{
        if(err)
            console.log("error occured"+err);
        else
            res.send(data);
    })
});

router.post('/addProduct',(req,res)=>{
    const prod_id = 0;
    let prod_name = req.body.prod_name;
    let prod_quantity = req.body.prod_quantity;
    let qry = `insert into products values(${prod_id},"${prod_name}",${prod_quantity})`;
    db.query(qry,
        (err,data)=>{
        if(err)
            res.status(500).send("Error occured"+err);
        else
            res.send("Product Added");
    });
});

router.put('/updateProductQuant', (req,res)=>{
    let prod_name = req.body.prod_name;
    let changed_quantity = req.body.prod_quantity;
    let query = `update products set prod_quantity = ${changed_quantity} where prod_name="${prod_name}"`;
    db.query(query,(err,data)=>{
            if(err)
                res.send("Error Occured"+ err);
            else{
                db.query(`select prod_quantity from products where prod_name = "${prod_name}"`,(err,data)=>{
                    if(err)
                        res.json({"err_message":"The contents may have been changed"});
                    else
                        res.json({"prod_name" : prod_name,
                    "prod_quantity" : data[0].prod_quantity});    
                })
            }    
    });
})

router.delete('/deleteProduct',(req,res)=>{
    let prod_name = req.body.prod_name;
    let query = `delete from products where prod_name = "${prod_name}"`;
    db.query(query,(err,data)=>{
        if(err)
            res.json({"err_message" : err});
        else
            res.json({"message": "Deleted!!"});
    })
});

module.exports = router;