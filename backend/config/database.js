const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://spreadnow4:RjRCKDUiHjAGCPw7@ac-gnsbh8b-shard-00-00.spu4tko.mongodb.net:27017,ac-gnsbh8b-shard-00-01.spu4tko.mongodb.net:27017,ac-gnsbh8b-shard-00-02.spu4tko.mongodb.net:27017/?replicaSet=atlas-lpsyvn-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Spread';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 