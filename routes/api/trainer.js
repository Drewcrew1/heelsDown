const express = require('express');
const router = express.Router();
const Trainer = require('../../models/Trainers');

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
//@route get api/trainer/setTime
//@access Public

router.post('/setTime',(req,res) => {
    
    Trainer.findOne({
        email: req.body.email
    }).then((trainer) => {
        if(!trainer){
            errors.email = 'No Trainer';
            return res.status(400).json(errors);
        }else{
            if(req.body.farm){
                trainer.farm = req.body.farm;
            }
        
          if(req.body.day){
            const time = {
                day: req.body.day,
                time: req.body.time
            };
            trainer.times.push(time);
          }
           
            

            trainer.save().then((trainer) => {
                        res.json(trainer);
                    }).catch((err) => {
                        console.log(err);
                    });

                }
          
        
    }).catch((err) => {
        console.log(err);
    });
});

//@route get api/trainers/getall
//@access Public
//validation add
router.get('/getall',(req,res) => {
    
    Trainer.find({}).populate('farm', 'name').then((all) => {
      return res.json(all);
            
    }).catch((err) => {
        console.log(err);
    });
});

//@route get api/trainers/getall
//@access Public
//validation add
router.get('/selectTime',(req,res) => {
    
    Trainer.find({farm: req.body.farm}).populate('farm', 'name').then((all) => {
      return res.json(all);
            
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = router;