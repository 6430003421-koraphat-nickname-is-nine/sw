const mongoose = require('mongoose');

// const uri = 'mongodb+srv://koraphat:Lumlertthum_2545@vacqcluster.bbc3cez.mongodb.net/VacQ?retryWrites=true&w=majority';

//console.log(uri);

const connectDB = async () =>{
    mongoose.set('strictQuery' , true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // const conn = await mongoose.connect(uri);
    
    
    console.log(`MongoDB Connected :${conn.connection.host}`);

}

module.exports = connectDB;