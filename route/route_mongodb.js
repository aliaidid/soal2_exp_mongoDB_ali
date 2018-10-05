var router = require('express').Router()
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
router.use(bodyParser.json())
var url = 'mongodb://ali:12345@localhost:27017/dataCPU'

const os = require('os');

var namaCPU = os.hostname();
var osTipe = os.type();
var osPlatform = os.platform();
var osRilis = os.release();
var ramSisa = os.freemem();
var ramTotal = os.totalmem();

MongoClient.connect(url, (error, db)=>{
    console.log("Connected to MongoDB!");
});

router.post('/data', (req, res)=>{
    MongoClient.connect(url, (error, db)=>{
        var input = {
            namacpu: namaCPU, 
            tipe: osTipe,
            platform: osPlatform, 
            rilis: osRilis,
            ramSisa: ramSisa, 
            ramTotal: ramTotal
        };
        var col = db.collection('data');
        col.insert(input, (error, hasil)=>{
            console.log(hasil);
            res.send(hasil);
        });
    });
})

router.get('/data', (req, res) => {
    MongoClient.connect(url, (error, db) => {
        var col = db.collection('data');
        col.find({}).toArray((error, hasil) => {
            console.log(hasil);
            res.send(hasil);
        });
    });
})

module.exports = router;