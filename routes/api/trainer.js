const express = require('express');
const router = express.Router();
const Trainer = require('../../models/Trainer');

//@route get api/trainer/setup
//@access Public
//validation add
router.post('/setup',(req,res) => {
    
    Trainer.findOne({
        email: req.body.email
    }).then((trainer) => {
        if(trainer){
            errors.email = 'Email Already Exists';
            return res.status(400).json(errors);
        }else{
          
            const newTrainer = new Trainer({
                name: req.body.name,
                email: req.body.email
            });
                    newTrainer.save().then((trainer) => {
                        res.json(trainer);
                    }).catch((err) => {
                        console.log(err);
                    });

                }
          
        
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;