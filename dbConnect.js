const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://dmAdmin:01100470401mongodb@atlascluster.epcfcnf.mongodb.net/maher-data', { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.on('error', err => console.log(err))
connection.on('connected',()=>console.log('Mongo DB Connection Established')) 