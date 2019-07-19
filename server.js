const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

 const users = require('./routes/api/user');
 const trainers = require('./routes/api/trainer');
 const farms = require('./routes/api/farm');

const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let db = "mongodb://drewcrew1:drewcar1@ds249123.mlab.com:49123/launchpartner";
// if(process.env.NODE_ENV === 'production'){
//  db = process.env.MONGOURI;
// }
// if(process.env.NODE_ENV === 'development'){
//  db = "mongodb://drewcrew1:drewcar1@ds249123.mlab.com:49123/launchpartner";
// }


mongoose.connect(db,{useNewUrlParser: true}).then(() => {
    console.log('mongo connected');
}).catch((err) => {
    console.log(err);
});



app.use('/api/users', users);
app.use('/api/trainers', trainers);
app.use('/api/farms', farms);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT);