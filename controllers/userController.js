const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/users');

// => localhost:3000/users/
// router.get('/', (req, res) => {
//     User.find((err, docs) => {
//         if (!err) { res.send(docs);}
//         else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

const getAllUser=async(req,res)=>{
    User.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
}


// router.get('/:username/:password', (req, res) => {
//     console.log("hi");
//     User.find({name:req.params.username},{name:1,password:1,user_type:1,_id:0},(err,doc)=>{
//         // console.log(doc)
//         if(doc[0].name==req.params.username && doc[0].password==req.params.password){
//         //return true;
//         // res.send("true")
//         console.log("admin true");
//         res.status(200).json({role:doc[0].user_type});
//         }
//        else{
//       //return false;
//         // res.send("false")
//         res.status(401).json({message:"invalid user"});
//        }
//     })
// });

const getUserAccess=async (req, res) => {
    console.log("hi");
    // try{
        User.find({name:req.params.username},{name:1,password:1,user_type:1,_id:0},(err,doc)=>{
            console.log(doc);
            if(doc[0]==undefined){
         res.status(401).json({message:'invalid user.Please register'})
            }
            else if(doc[0].name==req.params.username && doc[0].password==req.params.password){
            //return true;
            // res.send("true")
            console.log("admin true");
            res.status(200).json({role:doc[0].user_type});
            }
            else if(doc[0].name!=req.params.username || doc[0].password!=req.params.password){
         res.status(401).json({message:'username or password is invalid'})

            }
        // })}
       //catch(err){
      //return false;
        // res.send("false")
    //     else{
    //      res.status(401).json({message:'invalid user'})
    //    }

    })
}

// router.get('/:username/:password',async (req, res) => {
//     console.log("hi");
//     console.log(req.params.username);
//     try{
//         console.log("this is try block");
//     const users=await User.find({name:req.params.username},{name:1,password:1,user_type:1,_id:0});
//         // console.log(doc)
//         console.log("un: "+users);
//         console.log("un: "+user_type);
//         if(users.name==req.params.username && users.password==req.params.password){
//         //return true;
//         // res.send("true")
//         console.log("true");
//         return res.status(200).json({role:doc[0].user_type});
//         }
//         else if(users.name!=req.params.username && users.password!=req.params.password){
//             throw new Error("Invalid User")
//         }
//     }
//        catch(err){
//       //return false;
//         // res.send("false")
//         return res.status(401).json({error:err});
//        }
//     });


router.put('/:course/:user',(req,res)=>{
    console.log(req.params.course);
    console.log(req.params.user);
   //User.updateOne({name:req.params.user},{$push:{"paidCourse_id":req.params.course}},{upsert:true},(err,doc)=>{
  //User.updateOne({name:req.params.user},{$push:{paidCourse_id:req.params.course}},(err,doc)=>{
 // User.findOneAndUpdate({name:req.params.user},{$push:{"paidCourse_id.$[]":[req.params.course]}},{upsert:true},(err,doc)=>{
  User.find({name:req.params.user},(err,doc)=>{
console.log(doc);
  })  
 
 User.updateOne({name:req.params.user},{$push:{"paidCourse_id":req.params.course}},(err,doc)=>{
       
 console.log(doc);
        res.send(doc)
    })
})
router.get('/:course/:name/:name',(req,res)=>{
    console.log(req.params.course);
    console.log(req.params.name);
User.find({paidCourse_id:{$elemMatch:{$eq:req.params.course}}},{_id:0,name:1},(err,doc)=>{ 
    console.log("finally")
    console.log(doc);
    var flag=0;
    if(doc.length==0){
        console.log("onnum illa");
        res.send("false");
    }
    else{
    for(i=0;i<doc.length && flag==0;i++){
        //console.log(doc[i].name);
    if(doc[i].name==req.params.name){
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

module.exports = {
    getAllUser:getAllUser,
    getUserAccess:getUserAccess
};