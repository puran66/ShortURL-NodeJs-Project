const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.connect(process.env.DB).then(() => {
      console.log("DB connected successfully...");
    })
  }
  catch (err) {
    console.log(err, "db error");
  }
}

module.exports = connectDB;
