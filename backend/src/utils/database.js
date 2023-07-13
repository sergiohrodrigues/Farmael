import mongoose from "mongoose";

require('dotenv').config()

const URI = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.kke6sua.mongodb.net/?retryWrites=true&w=majority`

const databaseConnection = async () => {
    if(!global.mongoose){
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection