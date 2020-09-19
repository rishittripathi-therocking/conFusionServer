const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Leaders = require('../models/leaders');

const leaderRouters = express.Router();

leaderRouters.use(bodyParser.json());

leaderRouters.route('/')
.options(cors.corWithOptions, (req,res)=> {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corWithOptions,  authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Promotion Created', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouters.route('/:leaderId')
.options(cors.corWithOptions, (req,res)=> {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})
.put(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouters;