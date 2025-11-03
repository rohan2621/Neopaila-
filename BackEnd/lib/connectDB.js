import mongoose from "mongoose"

const connetDB = async (params) => {
    try {
         await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error)
    }
    
}