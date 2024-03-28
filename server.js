const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const cookieParser = require('cookie-parser');

//load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

// Router file
const hospitals = require('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');

const app = express();
app.use(cors())


//Body parser
app.use(express.json());

// Cookie Parser

app.use(cookieParser());


// Mount routers
app.use('/api/v1/hospitals' , hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments' , appointments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT , console.log('Server running in ' , process.env.NODE_ENV , 'mode on port ', PORT));

// Handle unhandled promise rejections
process.on('unhandleRejection' , (err , promise) => {
    console.log(`ERROR: ${err.massage}`);
    // Close server & exit process
    server.close(() => process.exit(1)); // close server and program if error occurs
}
);