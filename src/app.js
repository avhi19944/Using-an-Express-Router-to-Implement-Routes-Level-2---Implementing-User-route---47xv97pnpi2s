//Aim:Write a code to Update a product using Patch Request and  to delete a product using DELETE request

const fs = require('fs');
const express = require('express');
const { object } = require('joi');
const app = express();
const router = new express.Router();
const bodyParser = require('body-parser');

//middleware
router.use(express.json());
router.use(bodyParser.json());

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Handling PATCH request
router.patch('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
    const {title,price} = req.body;

    for(let i in product){
      console.log(i);
       if(product[i].id == req.params.id){
          product[i].title = title || product[i].title;
          product[i].price = price || product[i].price;

          fs.writeFile(`${__dirname}/../dev-data/product.json`,JSON.stringify(product),()=>{
               res.status(201).json({
                message:'success',
                data:{
                  product
                }
              })
          })
          return;
       }
      
    }

     return res.status(404).json({
      message:'Product Not Found',
      status:'Error'
    })


  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Updation Failed',
      status: 'Error',
    });
  }
});

//Deleting Product
router.delete('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
    const products = product.find((obj)=>obj.id == req.params.id);
    if(!products){
      return res.status(404).json({
        status:'Error',
        message:'Product Deletion Failed'
      })
    }
    const filteredProducts = product.filter((item)=>item.id!=req.params.id);
    fs.writeFile(`${__dirname}/../dev-data/product.json`,JSON.stringify(filteredProducts),()=>{
       res.status(201).json({
        status:'success',
        data:{
          product:filteredProducts
        }
       })
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Deletion Failed',
      status: 'Error',
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;
