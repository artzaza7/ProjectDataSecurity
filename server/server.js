const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { initMySQL } = require('./Config/database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000; // Use the PORT environment variable if available

// Middleware
app.use(bodyParser.json());
app.use(cors())
// app.use(cors({
//   credentials:true,
//   origin: ['http://localhost:3000/']
// }));

// Middleware to handle MySQL database connections
app.use(async (req, res, next) => {
  try {
    const conn = await initMySQL();
    req.conn = conn;
    next();
  } catch (error) {
    next(error);
  }
});

// Routes
const userRouter = require('./Routes/userRoute');
const statusRouter = require('./Routes/statusRoute');
const taskRouter = require('./Routes/taskRoute');
const categoryTaskRouter = require('./Routes/categoryTaskRoute');
const userTaskRouter = require('./Routes/userTaskRoute');

app.use('/api/users', userRouter);
app.use('/api/statuses', statusRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/categoryTasks', categoryTaskRouter);
app.use('/api/userTasks', userTaskRouter);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
