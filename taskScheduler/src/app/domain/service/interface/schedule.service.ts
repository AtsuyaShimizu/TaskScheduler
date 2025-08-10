// src/app/domain/service/interface/schedule.service.ts
import { Task, TaskId } from '../../model/task.model';

export interface CreateTaskInput {
  title: string;
  description?: string;
  assigneeId: string | null;
  start: string;
  end: string;
  category?: 'Feature'|'Bug'|'Chore'|'Research';
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: TaskId;
  progress?: number;
}

export interface ScheduleService {
  initForThisPage(): Promise<void>;
  create(input: CreateTaskInput): Promise<void>;
  update(input: UpdateTaskInput): Promise<void>;
  delete(id: TaskId): Promise<void>;
  selectTask(id: TaskId | null): void;
}
