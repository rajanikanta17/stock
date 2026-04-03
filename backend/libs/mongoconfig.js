const mongoose=require("mongoose")


require("dotenv").config()

module.exports.MongoDBconfig=()=>{
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;
    mongoose.connect(mongoUrl)
    .then(()=>{
        console.log("connected to database successfully")
    })
    .catch((err)=>{
        console.log("MonogoDB Connection Error",err)
    })

}
