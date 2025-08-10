import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // 保険（不要なら外してOK）
import { ScheduleBoardComponent } from '../../view/layouts/schedule-board/schedule-board.component';
import { ModalComponent } from '../../view/parts/modal/modal.component';
import { TaskFormComponent, TaskFormValue } from '../../view/parts/task-form/task-form.component';
import { SchedulePageState } from '../../domain/state/local/schedule-page.state';
import { SCHEDULE_SERVICE } from '../../di/tokens';
import { ScheduleService } from '../../domain/service/interface/schedule.service';

@Component({
  standalone: true,
  selector: 'app-schedule-page',
  imports: [CommonModule, ScheduleBoardComponent, ModalComponent, TaskFormComponent], // ★追加
  templateUrl: './schedule.page.html'
})
export class SchedulePage {
  // テンプレートから触るので public にするか、テンプレートでは直接呼ばない
  private readonly svc = inject<ScheduleService>(SCHEDULE_SERVICE)!; // ←テンプレートで直接使わない
  private readonly state = inject(SchedulePageState);

  tasksSig = this.state.tasksSig();
  membersSig = this.state.membersSig();

  showForm = signal(false);
  editingTaskId = signal<string | null>(null);

  // テンプレートで重い式を書かない
  initialForm = computed(() => {
    const id = this.editingTaskId();
    if (!id) return null;
    const t = this.tasksSig().find(x => x.id === id);
    if (!t) return null;
    return {
      title: t.title,
      description: t.description,
      assigneeId: t.assigneeId,
      start: t.start,
      end: t.end,
      category: t.category,
      progress: t.progress
    };
  });

  async ngOnInit() { await this.svc.initForThisPage(); }

  onAddTask() { this.editingTaskId.set(null); this.showForm.set(true); }
  onRowClick(taskId: string) { this.editingTaskId.set(taskId); this.showForm.set(true); }
  onCloseForm() { this.showForm.set(false); this.editingTaskId.set(null); }

  // ★テンプレートから1発呼ぶだけにする（spread等を使わない）
  async onSubmitForm(v: TaskFormValue) {
    const id = this.editingTaskId();
    if (id) {
      await this.svc.update({ id, ...v });   // UpdateTaskInput と整合
    } else {
      await this.svc.create(v);              // CreateTaskInput と整合
    }
    this.onCloseForm();
  }
}
