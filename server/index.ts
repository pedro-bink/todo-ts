import { prisma } from "./src/lib/prisma";
import cors from "cors";
import express from "express";

var port = 3000;
const host = "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = req.body;
  if (!task.title || !task.description || !task.userId) {
    res.status(400).json({
      error: "Bad request",
    });
  }
  const taskCreated = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      User: {
        connect: {
          id: task.userId,
        },
      },
    },
  });
  res.status(201).json(taskCreated);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: id },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    await prisma.task.delete({
      where: { id: id },
    });
    res.status(200);
  } catch (error) {
    res.status(404).json({
      error: "Task has not been deleted!",
    });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
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

app.post("/register", async (req, res) => {
  const user = req.body;
  try {
    if (!user.email || !user.password) {
      throw new Error("Invalid credentials");
    }
    const response = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      error: "Bad request",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Bad request",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    if (user.password === password && user.email === email) {
      res.status(201).json({
        jwtFake: "Access-Allowed",
        name: user.name,
        userId: user.id,
      });
    } else {
      res.status(404).json("User not found");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
