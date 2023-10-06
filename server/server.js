const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(bodyParser.json());

// Adding routes
const userRouter = require('./Routes/userRoute');
const statusRouter = require('./Routes/statusRoute');
const taskRouter = require('./Routes/taskRoute');
const categoryTaskRouter = require('./Routes/categoryTaskRoute');
const userTaskRouter = require('./Routes/userTaskRoute');

// Example
app.use('/api/users', userRouter);
app.use('/api/statuses', statusRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/categoryTasks', categoryTaskRouter);
app.use('/api/userTasks', userTaskRouter);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Http server run at ${port}`);
});
