const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Material } = require('../models/material');

// => localhost:3000/materials/
router.get('/', (req, res) => {
    Material.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    Material.find({_id:req.params.id},(err, docs) => {
        if (!err) { res.send(docs[0]); console.log(docs);}
        else { console.log('Error in Retriving Materials :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:Domain/:course', (req, res) => {
   Material.find({Domain:req.params.Domain},{_id:0},(err,doc)=>{
    console.log(doc);
        res.send(doc)
    });
});
router.get('/:course/:course/:course',(req,res)=>{
    Material.find({course_id:req.params.course},{_id:0,cost:1},(err,doc)=>{
        console.log(doc[0]);
        res.send(doc[0]);
    });
})

router.get('/:Domain', (req, res) => {
    Material.find({Domain:req.params.Domain},{_id:0,course_id:1},(err,doc)=>{
        res.send(doc)
    });
});

router.post('/',(req,res)=>{
    var mat=new Material({
        Domain : req.body.Domain,
        course_id : req.body.course_id,
        link1 : req.body.link1,
        link2 : req.body.link2,
        link3 : req.body.link3,
        video1: req.body.video1,
        video2: req.body.video2,
        video3: req.body.video3,
        cost: req.body.cost
    });
    mat.save((err,docs)=>{
        if(!err)
            res.send(docs);
        else
            console.log('Error in Retrieving Materials : '+JSON.stringify(err,undefined,2));
    });
});


router.put('/:id',(req,res)=>{
    console.log("BTS")
    console.log(req.params.id);
    console.log(req.body.Domain);
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with the given id : $(req.params.id)`);
    var mat={
        Domain : req.body.Domain,
        course_id : req.body.course_id,
        link1 : req.body.link1,
        link2 : req.body.link2,
        link3 : req.body.link3,
        video1: req.body.video1,
        video2: req.body.video2,
        video3: req.body.video3,
        cost: req.body.cost
    };
    Material.findByIdAndUpdate(req.params.id,{$set:mat},{new:true},(err,data)=>{
        if(!err)
            res.send(data);
        else
            console.log('Error in Material Update : '+JSON.stringify(err,undefined,2));
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with the given id : $(req.params.id)`);

    Material.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err)
            res.send(data);
        else
            console.log('Error in Material Delete : '+JSON.stringify(err,undefined,2));
    });
});

module.exports = router;