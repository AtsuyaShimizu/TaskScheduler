// src/app/view/parts/task-form/task-form.component.ts
import { Component, EventEmitter, Input, Output, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member } from '../../../domain/model/member.model'; // ★追加

export interface TaskFormValue {
  title: string;
  description?: string;
  assigneeId: string | null;
  start: string;
  end: string;
  category?: 'Feature'|'Bug'|'Chore'|'Research';
  progress?: number;
}

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  @Input() members: ReadonlyArray<Member> = []; 
  @Input() initial: Partial<TaskFormValue> | null = null;
  @Output() submitForm = new EventEmitter<TaskFormValue>();
  @Output() cancel = new EventEmitter<void>();

  val = signal<TaskFormValue>({
    title: '',
    assigneeId: null,
    start: new Date().toISOString().slice(0,10),
    end: new Date().toISOString().slice(0,10),
    description: '',
    category: 'Feature',
    progress: 0
  });

  constructor() {
    effect(() => {
      if (this.initial) this.val.update(v => ({ ...v, ...this.initial! }));
    });
  }

  onSubmit() { this.submitForm.emit(this.val()); }
}
