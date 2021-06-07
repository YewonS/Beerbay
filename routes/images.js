const mongodb = require('mongodb')
const mongoClient = require('../mongo');

const db = mongoClient.db("images");
var bucket = new mongodb.GridFSBucket(db);
let imageFilterRouter = require('express').Router();

imageFilterRouter.use(async (req,res,next)=>{
    try {
        req.search={$and:[]}
        if(req.query.beerID){
            req.search.$and.push({"metadata.beerID":req.query.beerID})
        }
        if(req.query.shopID){
            req.search.$and.push({"metadata.shopID":req.query.shopID})
        }
        if(req.search.$and.length == 0){
            req.search = undefined;
        }
        next()        
    } catch (error) {
        next(error)
    }
})

imageFilterRouter.use('/:index',async (req,res,next)=>{
    try {
        let image = await bucket
        .find(req.search).sort({_id:1}).skip(parseInt(req.params.index)).next();
        req.image = image
        next()
    } catch (error) {
        next(error)
    }
})
imageFilterRouter.get('/:index',async (req,res,next)=>{
    try {
        if(req.image.metadata.mimetype){
            res.setHeader('content-type', req.image.metadata.mimetype);
        }else{
            res.setHeader('content-type', 'application/octet-stream');
        }
        bucket.openDownloadStream(req.image._id).pipe(res);
    } catch (error) {
        next(error)
    }
})
imageFilterRouter.get('/:index/info',async (req,res,next)=>{
    try {
        res.send(req.image)
    } catch (error) {
        next(error)
    }
})
imageFilterRouter.delete('/:index',async (req,res,next)=>{
    try {
        bucket.delete(req.image._id);
        res.send({ok:true})
    } catch (error) {
        next(error)
    }
})
imageFilterRouter.get('/', async (req, res,next) => {
    try {
        let images = await bucket
        .find(req.search).count();
        res.send({ response: images });
    } catch (error) {
        next(error)
    }
});
imageFilterRouter.post('/',async (req, res,next) => {
    try {
        if(!req.files.image){
            throw new Error("missing image")
        }
        const db = mongoClient.db("images");
        var bucket = new mongodb.GridFSBucket(db);
        bucket.openUploadStream(req.files.image.name,{
            metadata: {
                beerID:req.body.beerid,
                shopID:req.body.shopid,
                mimetype:req.files.image.mimetype,
            }
        }).end(req.files.image.data)
        res.send({"ok":true})
    } catch (error) {
        next(error)
    }
});

module.exports = imageFilterRouter;