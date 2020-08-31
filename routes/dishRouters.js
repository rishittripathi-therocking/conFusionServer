const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to You!');
})
.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name  + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    res.end('Deleteing all the dishes!' );
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of dish: ' + req.params.dishId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req,res,next) => {
    res.write('Updating dish: ' + req.params.dishId);
    res.end('Dish with name ' + res.body.name + ' with description ' + res.body.description );
})
.delete((req,res,next) => {
    res.end('Deleteing dish: ' + req.params.dishId );
});

module.exports = dishRouter;