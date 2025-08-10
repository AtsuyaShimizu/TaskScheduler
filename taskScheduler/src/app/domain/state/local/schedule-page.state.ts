// src/app/domain/state/local/schedule-page.state.ts
import { Injectable, Signal, computed, signal } from '@angular/core';
import { SchedulePageStatePort } from '../interface/schedule-page.state';
import { Task } from '../../model/task.model';
import { Member } from '../../model/member.model';

@Injectable({ providedIn: 'root' })
export class SchedulePageState implements SchedulePageStatePort {
  // 外部から直接触らせない
  private readonly _tasks = signal<readonly Task[]>([]);
  private readonly _members = signal<readonly Member[]>([]);
  private readonly _rangeStart = signal<Date>(startOfWeek(new Date()));
  private readonly _rangeEnd   = signal<Date>(endOfWeek(new Date()));
  private readonly _selectedTaskId = signal<string | null>(null);

  // ---- getter公開（読み取りのみ） ----
  tasks() { return this._tasks(); }
  tasksSig(): Signal<readonly Task[]> { return this._tasks.asReadonly(); }
  members() { return this._members(); }
  membersSig(): Signal<readonly Member[]> { return this._members.asReadonly(); }
  rangeStart() { return this._rangeStart(); }
  rangeEnd() { return this._rangeEnd(); }
  selectedTaskId() { return this._selectedTaskId(); }

  // ---- ここから下はサービス専用：state変更用メソッド ----
  /** @internal */ setTasks(next: readonly Task[]) { this._tasks.set(next); }
  /** @internal */ upsertTask(t: Task) {
    const map = new Map(this._tasks().map(x => [x.id, x]));
    map.set(t.id, t);
    this._tasks.set([...map.values()]);
  }
  /** @internal */ removeTask(id: string) {
    this._tasks.set(this._tasks().filter(t => t.id !== id));
  }
  /** @internal */ setMembers(next: readonly Member[]) { this._members.set(next); }
  /** @internal */ setRange(start: Date, end: Date) { this._rangeStart.set(start); this._rangeEnd.set(end); }
  /** @internal */ selectTask(id: string | null) { this._selectedTaskId.set(id); }
}

// シンプルな週境界関数（MVP用）
function startOfWeek(d: Date) { const x = new Date(d); const day = x.getDay()||7; x.setDate(x.getDate() - (day-1)); x.setHours(0,0,0,0); return x; }
function endOfWeek(d: Date) { const s = startOfWeek(d); const x = new Date(s); x.setDate(s.getDate()+6); x.setHours(23,59,59,999); return x; }
