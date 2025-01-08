interface Task {
  id: number;
  text: string;
  summary: string | null;
  lang: string;
}

export class TasksRepository {
  private tasks: Task[] = [];
  private currentId: number = 1;

  createTask({ text, lang }: { text: string, lang: string }): Task {
    const task: Task = {
      id: this.currentId++,
      text,
      lang,
      summary: null
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: number, summary: string): Task | null {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].summary = summary;
      return this.tasks[taskIndex];
    }
    return null;
  }

  getTaskById(id: number): Task | null {
    return this.tasks.find(t => t.id === id) || null;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  deleteById(id: number): boolean {
    if (!this.tasks.find(t => t.id === id)) {
      return false
    }
    this.tasks = this.tasks.filter((task) => task.id !== id)

    return true
  }
  
}