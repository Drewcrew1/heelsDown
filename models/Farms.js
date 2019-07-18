const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FarmSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   trainers: {
    type: Schema.Types.ObjectId,
   ref: 'trainers' 
},
    timesBooked: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users' 
            },
            trainer:{
                type: Schema.Types.ObjectId,
                ref: 'trainers' 
            },
            time: {
                type: Schema.Types.ObjectId,
                timeSlot: Number
            }
        }
    ]  
    
});
module.exports = Farm = mongoose.model('farms', FarmSchema);