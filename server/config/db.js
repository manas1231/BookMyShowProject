const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,
            {useNewUrlParser:true,useUnifiedTopology:true}
        );
        console.log("MongoDb connected")
    }catch(error){
        console.log("MongoDB connection error ",error);
        process.exit(1);
    }
}

module.exports=connectDB;