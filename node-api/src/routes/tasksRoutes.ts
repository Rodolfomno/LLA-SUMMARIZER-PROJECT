import { Router, Request, Response } from "express";
import { TasksRepository } from "../repositories/tasksRepository";

const router = Router();
const tasksRepository = new TasksRepository();
const availableLanguages = ['pt', 'en', 'es' ]
const url = 'http://localhost:8000/summarize'

// POST: Cria uma tarefa e solicita resumo ao serviço Python
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text, lang } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Campo text é obrigatório.' });
    }
    if (!lang) {
      return res.status(400).json({ error: 'Campo lang" é obrigatório.' });
    }

    if(!availableLanguages.includes(lang.toLowerCase())){
      return res.status(400).json({ error: 'Language not supported.' });
    }

    // Cria a "tarefa"
    const task = tasksRepository.createTask({ text, lang });

    // Deve solicitar o resumo do texto ao serviço Python
    const { summary } = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lang, text }),
    }).then(response => response.json()) 


    // Atualiza a tarefa com o resumo
    tasksRepository.updateTask(task.id, summary);

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: tasksRepository.getTaskById(task.id),
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao criar a tarefa." });
  }
});

// GET: Lista todas as tarefas
router.get("/", (req, res) => {
  const tasks = tasksRepository.getAllTasks();
  return res.json(tasks);
});

router.delete('/:id', (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id)

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  const isDeleted = tasksRepository.deleteById(taskId);

  if (isDeleted) {
    return res.status(200).json({ message: `Task ${taskId} has been deleted` });
  } else {
    return res.status(404).json({ message: `Task ${taskId} not found` });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id)

  if (isNaN(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  const task = tasksRepository.getTaskById(taskId);

  if (task) {
    return res.status(200).json(task);
  } else {
    return res.status(404).json({ message: `Task ${taskId} not found` });
  }
});
export default router;
