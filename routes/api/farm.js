const express = require('express');
const router = express.Router();
const Farm = require('../../models/Farms');
const Trainer = require('../../models/Trainers');

//@route get api/farm/setup
//@access Public
//validation add
router.post('/setup',(req,res) => {
    
    Farm.findOne({
        email: req.body.email
    }).then((user) => {
        if(user){
            errors.email = 'Email Already Exists';
            return res.status(400).json(errors);
        }else{
          
            const newFarm = new Farm({
                name: req.body.name,
                email: req.body.email
            });
                    newFarm.save().then((farm) => {
                        res.json(farm);
                    }).catch((err) => {
                        console.log(err);
                    });

                }
          
        
    }).catch((err) => {
        console.log(err);
    });
});

//@route get api/farms/getall
//@access Public
//validation add
router.get('/getall',(req,res) => {
    
    Farm.find({}).then((all) => {
      return res.json(all);
            
    }).catch((err) => {
        console.log(err);
    });
});
//@route get api/farms/getTrainers
//@access Public
//validation add
router.get('/getTrainers',(req,res) => {
    
    Farm.find({email: req.body.email}).then((farm) => {
      console.log(farm[0]._id);
        Trainer.find({farm: farm[0]._id }).then((all) => {
            return res.json(all);
        }).catch((err) => {
            console.log(err);
        })
            
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;