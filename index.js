const express = require('express');
const mongoose = require('mongoose')
const Product = require('./models/producetModel')
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("Homepage");
})

app.get('/blog',(req,res)=>{
    res.send("Blog page");
})

//Add Products to the Database
app.post('/product',async(req,res)=>{
    // res.send(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//Get all Products from the Database
app.get('/product',async(req,res)=>{
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }catch(error){
    res.status(500).json({message:error.message});
  }
})

//Get a single Product from the Database with Id
app.get('/product/:id',async(req,res)=>{
    try{
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    }catch(error){
      res.status(500).json({message:error.message});
    }
  })

//Update the Product from the Database with Id
app.put('/product/:id',async(req,res)=>{
    try{
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if(!product){
        return res.status(404).json({message: `cannot find the product with ${id} ID`})
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    }catch(error){
      res.status(500).json({message:error.message});
    }
  })


//Deleting a product from Database
app.delete('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product)
        {
            res.status(404).json({message: `cannot find product with ${id}`});
        }
        res.status(500).json({product});
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//connecting to the database with the url and password
mongoose.connect('mongodb+srv://ziaualhassain:Admin123456789@learning.fvzn35b.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to DB")
    //accessing only when connected to the db
    app.listen(PORT,()=>{
        console.log(`server started on the port ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})