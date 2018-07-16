const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const column = require('../models/column');
const siteLog = require('../models/siteLog');

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

     /*
     client has to make 2 calls to get article data.
     1st call to get column data, which has array of articl Ids.
     2nd call use article Ids to get data for each.
     reduce to 1 call.
     */
     // const logIds = data.data.logs;
     // let articles = [];
     //
     //
     // const getArticle = async (id) => {
     //   return await siteLog.findById(id).select('title _id url entryDate').exec();
     // };
     //
     // genFor(function*(){
     //   for (each of logIds) {yield each}
     // });
     //
     // function genFor(generator){
     //   var gen = generator();
     //
     //   function handle(yielded){
     //     if(!yielded.done){
     //
     //       let id = yielded.value;
     //
     //       getArticle(id).then((data) => {
     //         articles.push(data);
     //         return handle(gen.next());
     //       });
     //     }
     //
     //     if(yielded.done){
     //       res.status(200).json({
     //         articles
     //       })
     //     }
     //
     //   }
     //   return handle(gen.next());
     // }


     res.status(200).json({data});

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
