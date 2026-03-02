const mongoose = require("mongoose");

const ServiceDetails = new mongoose.Schema({
   servicename :{
    type: String,
    required: true
   },
   descp :{
    type: String,
    required: true
   },
   serviceimg :{
    type: String,
    required: true
   },
   duration :{
    type: Number,
    required: true
   },
   price :{
      type:Number,
      required: true
   }
});

module.exports = mongoose.model("service",ServiceDetails);
