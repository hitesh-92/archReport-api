const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const column = require('../models/column');

// create new column
router.post('/', (req, res, next) => {
    let logsIds;
    if(req.body.logs.length === 0){
      logIds = [];
    } else {
      logsIds = req.body.logs;
    }


    const Column = new column({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      logs: logsIds
    });

    Column.save().then((col) => {
      res.status(201).send(col);
    }).catch((err) => {
      res.status(400).json({error: err});
    });

});


//get all
router.get('/', (req,res,next) => {
  column.find()
  .select('title logs')
  .exec()
  .then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).json({error: err});
  });
});


//get column by Id
router.get('/:columnId', (req, res, next) => {
  const id = req.params.columnId;

  column.findById(id)
   .select('_id logs title')
   .exec()
   .then((data) => {

     if(!data){
       return res.status(404).send();
     }

     res.send({data});

   }).catch((err) => {
     res.status(500).json({error: err});
   });
});


//update logs array
router.patch('/update', (req, res, next) => {
  const area = req.area;
  const logs = req.logs;

  column.findOneAndUpdate(
    area, {$set: logs}, {new: true}
  ).then((log) => {
    if(!log){
      return status(404).json({error: 'area selected not found'});
    }
    res.status(200).json({status:'success'});
  }).catch((err) => {
    res.status(500).json({error: err})
  });
});

//delete by id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).json({
      error: 'Invalid request to delete. Submit correct column ID',
      completed: false
    });
  }

  column.findByIdAndRemove({_id: id})
   .exec()
   .then((result) => {

     if(!result){
       return res.status(404).json({
         message: 'Unable to remove column. See Database'
       });
     }

     res.status(200).json({
       message: 'Column Deleted'
     });

   }).catch((err) => {
     res.status(500).json({error: err});
   });


});





module.exports = router;
