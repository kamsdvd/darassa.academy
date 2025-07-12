import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

app.get('/', function (_req, res) {
  res.send('API is running');
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; 