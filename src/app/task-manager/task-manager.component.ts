import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  category: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
  encapsulation: ViewEncapsulation.None // 👈 Ensures styles are applied globally
})
export class TaskManagerComponent {
  tasks: Task[] = [];
  newTask: Task = { title: '', category: '', completed: false };
  categories: string[] = ['Work', 'Personal', 'Urgent', 'Others'];
  searchQuery: string = '';
  filterCategory: string = '';
  filterStatus: string = '';

  // Add a new task
  addTask(): void {
    if (this.newTask.title.trim() && this.newTask.category) {
      this.tasks.push({ ...this.newTask });
      this.newTask = { title: '', category: '', completed: false };
    }
  }

  // Edit an existing task
  editTask(task: Task): void {
    const updatedTitle = prompt('Edit Task:', task.title);
    if (updatedTitle !== null && updatedTitle.trim()) {
      task.title = updatedTitle;
    }
  }

  // Delete a task
  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t !== task);
    }
  }

  // Toggle task status (Completed/Pending)
  toggleStatus(task: Task): void {
    task.completed = !task.completed;
  }

  // Filtered tasks based on search, category, and status
  filteredTasks(): Task[] {
    return this.tasks.filter(task =>
      (!this.searchQuery || task.title.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (!this.filterCategory || task.category === this.filterCategory) &&
      (!this.filterStatus || (this.filterStatus === 'completed' ? task.completed : !task.completed))
    );
  }

  // Track function for better performance in ngFor
  trackByIndex(index: number): number {
    return index;
  }
}
