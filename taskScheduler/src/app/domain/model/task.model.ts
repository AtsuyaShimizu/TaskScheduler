export type TaskId = string;

export interface Task {
  id: TaskId;
  projectId?: string | null;
  title: string;
  description?: string;
  assigneeId: string | null;
  start: string; // ISO (日付 or 日時). MVPは日単位でOK
  end: string;   // ISO
  progress: number; // 0..100
  category?: 'Feature' | 'Bug' | 'Chore' | 'Research';
}
