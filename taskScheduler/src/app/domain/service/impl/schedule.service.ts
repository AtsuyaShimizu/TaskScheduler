// src/app/domain/service/impl/mock-schedule.service.ts
import { Injectable } from '@angular/core';
import { ScheduleService, CreateTaskInput, UpdateTaskInput } from '../interface/schedule.service';
import { SchedulePageState } from '../../state/local/schedule-page.state';
import { Member } from '../../model/member.model';
import { Task } from '../../model/task.model';

@Injectable({ providedIn: 'root' })
export class MockScheduleService implements ScheduleService {
  constructor(private readonly state: SchedulePageState) {}

  async initForThisPage(): Promise<void> {
    // モックデータ
    const members: Member[] = [
      { id: 'u1', displayName: 'Alice' },
      { id: 'u2', displayName: 'Bob' },
      { id: 'u3', displayName: 'Carol' },
    ];
    const today = new Date();
    const iso = (d: Date) => d.toISOString().slice(0,10);
    const tasks: Task[] = [
      { id: 't1', title: '要件レビュー', assigneeId: 'u1', start: iso(addDays(today,0)), end: iso(addDays(today,2)), progress: 20, description: '', category: 'Feature', projectId: 'p1' },
      { id: 't2', title: 'API設計',     assigneeId: 'u2', start: iso(addDays(today,1)), end: iso(addDays(today,4)), progress: 50, description: '', category: 'Research', projectId: 'p1' },
    ];
    this.state.setMembers(members);
    this.state.setTasks(tasks);
  }

  async create(input: CreateTaskInput): Promise<void> {
    const id = cryptoRandom();
    const t: Task = { id, title: input.title, description: input.description ?? '', assigneeId: input.assigneeId, start: input.start, end: input.end, progress: 0, category: input.category ?? 'Feature', projectId: 'p1' };
    this.state.upsertTask(t);
  }

  async update(input: UpdateTaskInput): Promise<void> {
    const cur = this.state.tasks().find(x => x.id === input.id);
    if (!cur) return;
    const next = { ...cur, ...input };
    this.state.upsertTask(next);
  }

  async delete(id: string): Promise<void> {
    this.state.removeTask(id);
  }

  selectTask(id: string | null): void {
    this.state.selectTask(id);
  }
}

function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate()+n); return x; }
function cryptoRandom() { return 't_' + Math.random().toString(36).slice(2, 9); }
