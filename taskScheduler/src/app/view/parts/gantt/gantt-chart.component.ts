import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../domain/model/task.model';
import { Member } from '../../../domain/model/member.model'; // ★追加

@Component({
  standalone: true,
  selector: 'app-gantt-chart',
  imports: [DatePipe],
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent {
  @Input({ required: true }) tasks: ReadonlyArray<Task> = [];   // （任意で統一）
  @Input() members: ReadonlyArray<Member> = []; 
  @Output() rowClick = new EventEmitter<string>();

  days = computed(() => {
    if (this.tasks.length === 0) return [];
    const min = new Date(this.tasks.reduce((a,b)=> a < b.start ? a : b.start, this.tasks[0].start));
    const max = new Date(this.tasks.reduce((a,b)=> a > b.end   ? a : b.end,   this.tasks[0].end));
    const arr: Date[] = [];
    const d = new Date(min); d.setHours(0,0,0,0);
    const last = new Date(max); last.setHours(0,0,0,0);
    while (d <= last) { arr.push(new Date(d)); d.setDate(d.getDate()+1); }
    return arr;
  });

  getAssigneeName(id: string | null): string {
    if (!id || !this.members?.length) return '未割当';
    const m = this.members.find(m => m.id === id);
    return m?.displayName ?? '未割当';
  }

  dayIndex(dateIso: string) {
    const days = this.days();
    if (days.length === 0) return 0;
    const start = days[0];
    const d = new Date(dateIso);
    return Math.max(0, Math.floor((toYMD(d).time - toYMD(start).time) / (24*3600*1000)));
  }

  widthDays(startIso: string, endIso: string) {
    const s = new Date(startIso); const e = new Date(endIso);
    return Math.max(1, Math.floor((toYMD(e).time - toYMD(s).time) / (24*3600*1000)) + 1);
  }
}
function toYMD(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return { time: x.getTime() }; }
