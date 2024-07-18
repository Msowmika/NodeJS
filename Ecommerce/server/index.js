const express = require('express')
const app = express()
const port = 4000
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
var cors = require('cors')

app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.json({
        status:'sucess',
        message:'connection established'
    })
})


app.get('/products', async(req,res) =>{
    try{
   const products = await Product.find()
    res.json({
        status:'sucess',
        data: products
    })}
    catch(error){
        res.status(500).json({
           status:'error'
        })
    }
})

app.post('/products', async(req,res) =>{
    try{
    const{name,image,mrp,actualPrice,rating} = req.body
    await Product.create({name,image,mrp,actualPrice,rating})
    res.json({
        status:'sucess',
        data: 'request successful'
    })}
    catch(error){
        res.status(500).json({
           status:'error'
        })
    }
})

app.patch('/products/:id', async(req,res) =>{
    try{
    const{id} = req.params    
    const{name,image,mrp,actualPrice,rating} = req.body
    await Product.findByIdAndUpdate(id,{name,image,mrp,actualPrice,rating})
    res.json({
        status:'sucess',
        data: 'request successful'
    })}
    catch(error){
        res.status(500).json({
           status:'error'
        })
    }
})

app.delete('/products/:id', async(req,res) =>{
    try{
    const{id} = req.params
    await Product.findByIdAndDelete(id)
    res.json({
        status:'sucess',
        data: 'request successful'
    })}
    catch(error){
        res.status(500).json({
           status:'error'
        })
    }
})

const Product = mongoose.model( 'Product',{
    name: String,
    image: String,
    mrp: Number,
    actualPrice: Number,
    rating: Number
})

app.listen(port,()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log(`Server running at ${port}`))
    .catch((error)=>console.log(error))
})