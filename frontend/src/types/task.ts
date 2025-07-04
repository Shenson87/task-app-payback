export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  project_id: number;
}