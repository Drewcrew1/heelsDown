const express = require('express');
const router = express.Router();
const Farm = require('../../models/Farm');

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

module.exports = router;