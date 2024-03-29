const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'farms'  
    },
    times: [
        {
            day: String,
            time:{
                type: Number
            },
            booked: Boolean,
            user: {
                type: Schema.Types.ObjectId,
                 ref: 'users'
            } 
            
        }
    ]  
    
});
module.exports = Trainer = mongoose.model('trainer', TrainerSchema);