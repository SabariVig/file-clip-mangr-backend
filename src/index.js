const fs=require('fs')
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')

const Url = require('./Models/Url')

app.use(cors())
app.use(fileUpload())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});


app.get("/",(req,res)=>{
  res.send("Welcome to My Endpoint")
})



app.post("/",(req,res)=>{
  if (req.files === null ) return res.status(400).send("No File Uploaded")
  
  const file = req.files.file
  
  let file_mod = file.name
  file_mod=file_mod.replace(/\s/g, '-').toLowerCase()
  
  try{
    file.mv(`${__dirname}/uploads/${file_mod}`)
    
  }catch(err){
    console.log(err)
  }
  
})




const list=fs.readdirSync('./src/uploads')
console.log(list)

app.get("/list",(req,res)=>{
  res.json({name:list})
})




app.get("/uploads/:id",(req,res)=>{
  res.download(`${__dirname}/uploads/${req.params.id}`)
})








app.use(express.json())
app.post("/url",(req,res)=>{
  const url = new Url(
    {
      url:req.body.url
    }
    )
    try{
      url.save()
      res.send({name:req.body.url})

  }catch(err){
    res.json({message:err})
  } 
  // console.log(req.body.url)
})


app.get("/url",async (req,res)=>{
  // res.send("hello")
  const urllist = await Url.find()
  // console.log(urllist)
  res.json(urllist)

})





app.listen(8080)

