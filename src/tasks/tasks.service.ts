import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((t) => t.id == id);
        if(!task) {
            throw new NotFoundException('Unable to find task');
        }
        return task;
    }

    deleteTask(id: string): Task {
        const index = this.tasks.findIndex((t) => t.id == id);
        const task = this.tasks[index];
        if (!task) {
            throw new NotFoundException('Unable to find task');
        }
        this.tasks.splice(index, 1);
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
}
