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
        _id: req.body.id
    }).then((trainer) => {
        if(!trainer){
            let errors = 'No Trainer';
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
router.get('/selectTime/:id',(req,res) => {
    console.log(req.params.id);
    Trainer.find({farm: req.params.id}).populate('farm', 'name').populate('times.0.user','name').then((all) => {
      return res.json(all);
            
    }).catch((err) => {
        console.log(err);
    });
});
//@route get api/trainers/getall
//@access Public
//validation add
router.post('/selectFarm',(req,res) => {

    let trainerFields = {
      farm: req.body.farmId
    };

    Trainer.findOneAndUpdate({
        _id: req.body.trainerId
    },{
        $set: trainerFields
    },{
        new: true
    }).then((trainer) => {
         res.json(trainer);
    }).catch((err) => {
        console.log(err);
    });

});

//@route get api/trainers/setusertime
//@access Public
//validation add
router.get('/setUserOnTime/:email/:id/:user',(req,res) => {
    console.log(req.params.id);
    // Trainer.find({email: req.params.email}).then((trainer) => {
    //     console.log(trainer[0].times[0]._id);
        // if(req.params.id == trainer[0].times[0]._id){
        //     console.log('same');
        // }
        // for(let i = -1; i <= trainer[0].times.length; i++){
        //     if(req.params.id == trainer[0].times[0]._id){

                // let trainerFields = {
                //     "times.user": req.params.user
                // };
                Trainer.findOneAndUpdate({
                    email: req.params.email
                },{
                    $set: {"times.0.user": req.params.user,
                            "times.0.booked": true
                        }
                   
                },{
                    new: true
                }).then((trainer) => {
                    console.log('trainer in api',trainer);
                }).catch((err) => {
                    console.log(err);
                });

        //     }
        // }

    // }).catch((err) => {
    //     console.log(err);
    // });
});
//@route delete api/trainers/delete
//@access Public

router.delete('/deleteTrainer',(req,res) => {



    Trainer.findOneAndDelete({
        _id: req.body.trainerId
    
    }).then((trainer) => {
         res.json(trainer);
    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;