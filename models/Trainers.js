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
        ref: 'farm'  
    },
    times: [
        {
            day: String,
            time: number
            
        }
    ]  
    
});
module.exports = Trainer = mongoose.model('trainer', TrainerSchema);