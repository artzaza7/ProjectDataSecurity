// Set up about express or const
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

// app Use
app.use(bodyParser.json()) // For JSON body | POST Method

// Adding routes
const userRouter = require('./Routes/userRoute')
const statusRouter = require('./Routes/statusRoute')
const taskRouter = require('./Routes/taskRoute')
const categoryTaskRouter = require('./Routes/categoryTaskRoute')
const userTaskRouter = require('./Routes/userTaskRoute')

// Example
app.use('/api/users', userRouter);
app.use('/api/statuses', statusRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/categoryTasks', categoryTaskRouter);
app.use('/api/userTasks', userTaskRouter);

app.listen(port, (req, res) => {
    console.log(`Http server run at ${port}`)
})