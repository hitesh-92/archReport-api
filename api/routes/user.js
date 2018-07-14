const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//create new user
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'E-mail address exisits, try another'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).send(err);
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
                user.save().then(result => {
                    console.log(result);
                    res.status(201).json({message: 'new user created'});
                }).catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                })  //user.save
            });//bcrpyt
        }//else
    });
});//.post

//setup auto delete of token on logout
//user login2
router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch(err => { res.status(400).json({error: 'login fail'}); });
});

//delete user
router.delete('/:token', (req, res, next) => {
    req.delete.removeToken(req.token).then(() => {
        res.status(200).json({message: 'Logout successful'});
    }, () => { res.status(400).send(); });
});


router.get('/me', (req, res) => {
    res
});


module.exports = router;
