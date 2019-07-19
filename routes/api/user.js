const express = require('express');
const router = express.Router();
const User = require('../../models/Users');
const Trainer = require('../../models/Trainers');

//@route get api/users/setup
//@access Public
//validation add
router.post('/setup',(req,res) => {
    
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(user){
            errors.email = 'Email Already Exists';
            return res.status(400).json(errors);
        }else{
          
            const newUser = new User({
                name: req.body.name,
                email: req.body.email
            });
                    newUser.save().then((user) => {
                        res.json(user);
                    }).catch((err) => {
                        console.log(err);
                    });

                }
          
        
    }).catch((err) => {
        console.log(err);
    });
});
//@route get api/users/getall
//@access Public
//validation add
router.get('/getall',(req,res) => {
    
    User.find({}).then((all) => {
      return res.json(all);
            
    }).catch((err) => {
        console.log(err);
    });
});

//@route get api/users/TrainerTimes/:id
//@access Public
//get trainer times by farm id
router.get('/tt/:id',(req,res) => {
  
    
    Trainer.find({farm: req.params.id}).then((all) => {
       
        return res.json(all[0].times);
    
            
    }).catch((err) => {
        console.log(err);
    });
});
//@route get api/users/book
//@access Public
//validation add
router.post('/book',(req,res) => {
    
    User.find({email: req.body.email}).then((user) => {
     

            
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;