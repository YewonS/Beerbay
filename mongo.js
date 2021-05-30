const MongoClient = require('mongodb').MongoClient;

// Connection URL

const {url,db} = require('./config/mongoCredentials.js')
let client = new MongoClient(url, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect();
module.exports = client
