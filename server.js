const express = require('express')
const dbConnect = require('./dbConnect')
const app = express()

app.use(express.json())
const userRoute = require('./routes/usersRoute')
app.use('/api/users/', userRoute)

const transactionRoute = require('./routes/transactionRoute')
app.use('/api/transactions/', transactionRoute)

const port = process.env.PORT || 5000
// const port = 5000

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static('client/build'))
    app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client/build/index/html'))
    })
}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port,()=>console.log(`Node JS server started at port ${port}!`))