import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../domain/model/task.model';
import { Member } from '../../../domain/model/member.model';
import { GanttChartComponent } from '../../parts/gantt/gantt-chart.component';

@Component({
  standalone: true,
  selector: 'app-schedule-board',
  imports: [GanttChartComponent],
  templateUrl: './schedule-board.component.html',
  styleUrls: ['./schedule-board.component.css']
})
export class ScheduleBoardComponent {
  @Input() tasks: ReadonlyArray<Task> = [];
  @Input() members: ReadonlyArray<Member> = [];

  @Output() addTask = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<string>();
}
