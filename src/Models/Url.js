const mongoose = require('mongoose')


const Url= mongoose.Schema(
  {
    url:String
  }
)


module.exports = mongoose.model("URL" ,Url)
