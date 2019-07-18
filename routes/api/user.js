const express = require('express');
const router = express.Router();
const User = require('../../models/User');

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

module.exports = router;