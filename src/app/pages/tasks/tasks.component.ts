import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
    name: string;
    category: string;
    status: string;
}

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
    tasks: Task[] = [];
    taskName: string = '';
    taskCategory: string = '';
    searchTerm: string = '';
    filterCategory: string = '';
    filterStatus: string = '';

    categories: string[] = ['Work', 'Personal', 'Study']; // Example categories

    createTask() {
        if (this.taskName.trim() !== '' && this.taskCategory !== '') {
            this.tasks.push({
                name: this.taskName,
                category: this.taskCategory,
                status: 'Pending'
            });
            this.taskName = '';
            this.taskCategory = '';
        } else {
            alert("Task name and category are required!");
        }
    }

    editTask(index: number) {
        const newTaskName = prompt('Edit task:', this.tasks[index].name);
        if (newTaskName !== null && newTaskName.trim() !== '') {
            this.tasks[index].name = newTaskName;
        }
    }

    deleteTask(index: number) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks.splice(index, 1);
        }
    }

    toggleStatus(index: number) {
        this.tasks[index].status = this.tasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    }

    filteredTasks() {
        return this.tasks.filter(task =>
            (this.filterCategory ? task.category === this.filterCategory : true) &&
            (this.filterStatus ? task.status === this.filterStatus : true) &&
            (this.searchTerm ? task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
        );
    }
}
