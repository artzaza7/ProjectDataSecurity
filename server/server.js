// Set up about express or const
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000


// app Use
app.use(bodyParser.json()) // For JSON body | POST Method

// Adding routes
const userRouter = require('./Routes/userRoute')

// Example
app.use('/api/user', userRouter);

app.listen(port, (req, res) => {
    console.log(`Http server run at ${port}`)
})