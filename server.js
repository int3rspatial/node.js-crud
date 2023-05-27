import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectMongo } from './database/connection.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
dotenv.config({ path: 'var.env' });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json('Server is working');
});

const startApp = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (error) {
    console.log('ERROR');
  }
};

startApp();
