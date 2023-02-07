import { prisma } from "./src/lib/prisma";
import cors from "cors";
import express from "express";

var port = 3000;
const host = "0.0.0.0";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/tasks", (req, res) => {
  prisma.task
    .findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  console.log(task);
  if (!task.title || !task.description || !task.userId) {
    res.status(400).json({
      error: "Bad request",
    });
  }
  prisma.task
    .create({
      data: {
        title: task.title,
        description: task.description,
        User: {
          connect: {
            id: task.userId,
          },
        },
      },
    })
    .then((response) => res.status(201).json(response));
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: id },
  });
  if (!task) {
    res.status(404).json({
      error: "Task not found",
    });
  }
  await prisma.task.delete({
    where: { id: id },
  });
  res.status(200).json();
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

app.post("/users", async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    res.status(400).json({
      error: "Bad request",
    });
  }
  const response = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
  res.status(201).json(response);
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
