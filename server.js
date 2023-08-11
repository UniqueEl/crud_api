const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/productModel')

app.use(express.json());
app.get('/', (req,res)=> {
    res.send("hello node api")
})


app.post('/product', async(req,res)=> {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.get('/product/:id', async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
     
})

app.get('/product', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

app.put('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            res.status(404).json({message: "cannot find product id"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "no product found"})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('enter mongo uri')
.then(() => {
    console.log('connected to mongodb')
    app.listen(3000, ()=> {
        console.log('app is running on port 3000')
    });
})
