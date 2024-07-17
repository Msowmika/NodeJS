const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')
const ejs = require('ejs')

app.use(bodyParser.urlencoded())
app.set('view-engine','ejs')

app.get('/', (req,res) =>{
    res.json({
        status : 'Server is up',
        now : new Date()
    })
})

app.get('/users',async(req,res) =>{
  try{
    const users = await User.find()
    res.json({
        status: 'sucess',
        data: users
    })
}catch(error){
    res.status(500).json({
        status:'failed'
    })
}
})

app.post('/users',async(req,res) =>{
    try{
     const {firstName, lastName, email, avatar} = req.body
     await User.create({firstName,lastName,email,avatar})
      res.json({
          status: 'sucess',
          message: 'request succesful'
      })
  }catch(error){
      res.status(500).json({
          status:'failed'
      })
  }
  })

  app.patch('/users/:id',async(req,res) =>{
    try{
     const {id} = req.params
     const {firstName, lastName, email, avatar} = req.body
     await User.findByIdAndUpdate(id, {firstName,lastName,email,avatar})
      res.json({
          status: 'sucess',
          message: 'request succesful'
      })
  }catch(error){
      res.status(500).json({
          status:'failed'
      })
  }
  })  

  app.delete('/users/:id',async(req,res) =>{
    try{
     const {id} = req.params
     await User.findByIdAndDelete(id)
      res.json({
          status: 'sucess',
          message: 'request succesful'
      })
  }catch(error){
      res.status(500).json({
          status:'failed'
      })
  }
  })    

const User = mongoose.model('User',{
    firstName : String,
    lastName : String,
    email: String,
    avatar : String
})

app.listen(port ,()=>{
    mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log(`Server is running at ${port}`))
  .catch((error)=> console.log(error))
})