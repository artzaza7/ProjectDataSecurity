const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { initMySQL } = require('./Config/database');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter); // Apply to all routes under /api

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
