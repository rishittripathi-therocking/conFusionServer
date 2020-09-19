const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Promotions = require('../models/promotions');

const promoRouters = express.Router();

promoRouters.use(bodyParser.json());

promoRouters.route('/')
.options(cors.corWithOptions, (req,res)=> {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Promotion Created', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouters.route('/:promoId')
.options(cors.corWithOptions, (req,res)=> {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
.put(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouters;