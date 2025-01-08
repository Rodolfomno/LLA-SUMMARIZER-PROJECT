import express, { Application } from 'express';
import { Router, Request, Response } from "express";
import tasksRoutes from './routes/tasksRoutes';

const router = Router();

const app: Application = express();
app.use(express.json());

// Rotas
app.use('/tasks', tasksRoutes);

app.use('/', router.get("/", (req, res) => {
    return res.json({ message: 'API is running' });
  }))

export default app;