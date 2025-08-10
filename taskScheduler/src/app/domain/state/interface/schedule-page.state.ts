// src/app/domain/state/interface/schedule-page.state.ts
import { Signal } from '@angular/core';
import { Task } from '../../model/task.model';
import { Member } from '../../model//member.model';

export interface SchedulePageStatePort {
  // 読み取り専用Signalを返すgetter
  tasks(): readonly Task[];
  tasksSig(): Signal<readonly Task[]>;
  members(): readonly Member[];
  membersSig(): Signal<readonly Member[]>;
  rangeStart(): Date;
  rangeEnd(): Date;
  selectedTaskId(): string | null;
}
