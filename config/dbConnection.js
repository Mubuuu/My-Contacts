import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected at',connect.connection.name);
    } catch (error) {
        console.log(error);
    }
}
export default connectDB