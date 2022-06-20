const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/users');

// => localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:username/:password', (req, res) => {
    console.log("hi");
    User.find({name:req.params.username},{name:1,password:1,_id:0},(err,doc)=>{
        //console.log(doc)
        if(doc[0].name==req.params.username && doc[0].password==req.params.password){
        //return true;
        res.send("true")
        //console.log("crt");
       }
       else{
      //return false;
        res.send("false")
        //console.log("thu");
       }
    })
});

router.put('/:course/:user',(req,res)=>{
   // User.updateOne({name:req.params.user},{$set:{paidCourse_id:[100]}},(err,doc)=>{
    User.updateOne({name:req.params.user},{$push:{paidCourse_id:req.params.course}},(err,doc)=>{
        if(!err){
        console.log(doc);
        res.send(doc)
    }
        else{
            console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); 
        }
    })
})
router.get('/:course/:name/:name',(req,res)=>{
    console.log(req.params.course);
    console.log(req.params.name);
User.find({paidCourse_id:{$elemMatch:{$eq:req.params.course}}},{_id:0,name:1},(err,doc)=>{ 
    console.log("finally")
    console.log(doc);
    var flag=0;
    for(i=0;i<doc.length && flag==0;i++){
        //console.log(doc[i].name);
    if(doc[i].name=="req.params.name"){
        console.log("eruku");
        res.send("true");
        flag=1;
    }
    else{
        console.log("illa");
        console.log(i);
        if(i==doc.length-1){
            console.log("false");
           res.send("false");
        }
    }
}
})
})


router.post('/', (req, res) => {
    var user = new User({
        name: req.body.name,
        // user_id: req.body.user_id,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        paidCourse_id: req.body.paidCourse_id,
        user_type: req.body.user_type
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
        if(err.code==11000){
            console.log("nooo");
        res.send(err);
        }
    }
    });
});

module.exports = router;