const { userSchema } = require("../models");



const createUrl = (body) => {
  return userSchema.create(body);
}
const getData = () => {
  return userSchema.find();
}

const checkExist =(shortId)=>{
  const shortUrl = `http://localhost:4000/${shortId}`
  return userSchema.findOneAndUpdate({shortUrl:shortUrl},{ $inc: { clicks: 1 } },{ new: true } )
}

module.exports = { createUrl, getData ,checkExist}