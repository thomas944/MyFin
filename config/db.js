const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    const conn = await mongoose.connect("mongodb+srv://pham02:thomas2010@cluster0.kbzgk.mongodb.net/?retryWrites=true&w=majority")

    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error){
    console.log(`Error: ${error.message}`.red);
    process.exit(1)
  }
}

module.exports = connectDB