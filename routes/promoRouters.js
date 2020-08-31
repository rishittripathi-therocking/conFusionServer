const express = require('express');
const bodyParser = require('body-parser');

const promoRouters = express.Router();

promoRouters.use(bodyParser.json());

promoRouters.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to You!');
})
.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name  + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next) => {
    res.end('Deleteing all the promotions!' );
});

promoRouters.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of promotion: ' + req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotionss/' + req.params.promoId);
})
.put((req,res,next) => {
    res.write('Updating promotion: ' + req.params.promoId);
    res.end('Promotion with name ' + res.body.name + ' with description ' + res.body.description );
})
.delete((req,res,next) => {
    res.end('Deleteing promotion: ' + req.params.promoId );
});

module.exports = promoRouters;