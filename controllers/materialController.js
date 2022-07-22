const ObjectId = require('mongoose').Types.ObjectId;

const { Material } = require('../models/material');

// => localhost:3000/materials/
class MaterialController {
    static getAllMaterial = (req, res) => {
        Material.find((err, docs) => {
            if (!err)
                res.status(200).send({ docs });
            else
                res.status(401).send(err)
        });
    }

    static getIdMaterial = (req, res) => {
        Material.find({ _id: req.params.id }, (err, docs) => {
            if (!err)
                res.status(200).send({ docs });
            else
                res.status(401).send(err)
        });
    }
    static getDomainName =  (req, res) => {
         Material.find({ courseId: req.params.courseId }, { _id: 0, domain: 1 }, (err, docs) => {
            if (!err)
                res.status(200).json(docs[0].domain);
            else
                res.status(401).send(err)
        })
    }

    static getMaterial = (req, res) => {
        Material.find({ domain: req.params.domain }, { _id: 0 }, (err, doc) => {
            if (!err)
                res.status(200).send({ doc });
            else
                res.status(401).send(err)
        });
    }

    static getCourseCost = (req, res) => {
        Material.find({ courseId: req.params.course }, { _id: 0, cost: 1 }, (err, doc) => {
            if (!err)
                res.status(200).send({ cost: doc[0].cost });
            else
                res.status(401).send(err)
        });
    }
    static getCourseId = (req, res) => {
        Material.find({ _id: req.params.id }, { _id: 0, courseId: 1 }, (err, doc) => {
            if (!err)
                res.status(200).send({ courseId: doc[0].courseId });
            else
                res.status(401).send(err)
        });
    }
    static checkCourseID = (req, res) => {
        Material.find({ courseId: req.params.courseId }, (err, doc) => {
            if (doc.length == 0) {
                res.status(200).send({ message: 'Can proceed' })
            }
            else {
                res.status(400).send({ message: 'This Id is already taken.Please proceed with another courseId' })
            }
        })
    }
    static postMaterial = (req, res) => {
        let mat = new Material({
            domain: req.body.domain,
            courseId: req.body.courseId,
            link1: req.body.link1,
            link2: req.body.link2,
            link3: req.body.link3,
            video1: req.body.video1,
            video2: req.body.video2,
            video3: req.body.video3,
            cost: req.body.cost,
            image: req.body.image
        });
        mat.save((err, docs) => {
            if (!err)
                res.status(200).json({ message: 'Created Successfully' })
            else
                res.status(401).send(err)
        });
    }


    static putMaterial = (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with the given id : $(req.params.id)`);
        let mat = {
            domain: req.body.domain,
            courseId: req.body.courseId,
            link1: req.body.link1,
            link2: req.body.link2,
            link3: req.body.link3,
            video1: req.body.video1,
            video2: req.body.video2,
            video3: req.body.video3,
            cost: req.body.cost,
            image: req.body.image
        };
        Material.findByIdAndUpdate(req.params.id, { $set: mat }, { new: true }, (err, data) => {
            if (!err)
                res.status(200).json({ message: 'Updated Successfully' })
            else
                res.status(401).send(err)
        });
    }

    static deleteMaterial = (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(404).send(`No record with the given id : $(req.params.id)`);

        Material.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err)
                res.status(200).json({ message: 'Deleted Successfully' })
            else
                res.status(401).send(err)
        });
    }

}

module.exports = MaterialController;
