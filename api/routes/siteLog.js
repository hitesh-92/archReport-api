const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const siteLog = require('../models/siteLog');

//create new site log
router.post('/', (req, res, next) => {
    const Log = new siteLog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        url: req.body.url,
        entryDate: new Date().toString()
    });
    Log.save().then(log => {
        res.status(201).send(log);
    }).catch(err => {
        res.status(400).send(err);
    })
});

//get all site logs
router.get('/', (req, res, next) => {
    siteLog.find()
    .select('_id title url entryDate')
    .exec()
    .then(logs => {
        const response = {
            count: logs.length,
            logs: logs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    url: doc.url,
                    entryDate: doc.entryDate
                }
            })
        };//response
        res.status(200).send({response});
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

//get by ID
router.get('/:logId', (req, res, next) => {
    const id = req.params.logId;

    siteLog.findById(id)
    .select('_id title url entryDate')
    .exec().then(log => {
        // console.log('Log found:', log);
        if(!log){
            return res.status(404).send();
        }
        res.send({log});
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

//get by ID & Update
router.patch('/:logId', (req, res, next) => {
    const id = req.params.logId;
    // const title = _.pick(req.body, ['title']);
    // const url = _.pick(req.body, ['url']);
    const body = _.pick(req.body, ['title', 'url']);


    if(!ObjectID.isValid(id)){
        return res.status(404).json({
            error: 'Log not found'
        });
    }

    siteLog.findOneAndUpdate(
        id, {$set: body}, {new: true}
    ).then(log => {
        if(!log){
            return res.status(404).json({error: 'not found'});
        }
        res.status(200).send({log})
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//delete log
router.delete('/:logId', (req, res, next) => {
    const id = req.params.logId;

    if(!ObjectID.isValid(id)){
        return res.status(404).json({
            error: 'Invalid request to delete. Please contant for further assistance'
        });
    }

    siteLog.findByIdAndRemove({ _id: id })
    .exec().then(result => {
        if(!result){
            return res.status(404).json({
                message: 'Unable to remove item contact for further assistance'
            });
        }
        res.status(200).json({
            message: 'Item deleted'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err });
    });
});







module.exports = router;
