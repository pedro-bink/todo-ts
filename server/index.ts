import { prisma } from './src/lib/prisma';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  if (!task.title || !task.description) {
    res.status(400).json({
      error: 'Bad request',
    });
  }
  const taskCreated = await prisma.task.create({
    data: {
      date: task.date,
      title: task.title,
      description: task.description,
    },
  });
  res.status(201).json(taskCreated);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id },
  });
  if (!task) {
    res.status(404).json({
      error: 'Task not found',
    });
  }
  await prisma.task.delete({
    where: { id: id },
  });
  res.status(200).json();
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  console.log(req);
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
    },
  });
  res.status(200).json();
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
