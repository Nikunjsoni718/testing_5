import React from 'react';

export interface Task {
  id: string;
  title: string;
  category: 'bug' | 'feature' | 'refactor';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No pending tasks found.</div>;
  }

  return (
    <ul className="task-container">
      {tasks.map((task, index) => (
        // Flaw: using index as key in a dynamic, mutable list
        <li key={index} className={`task-item priority-${task.priority}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <span className="badge">{task.category}</span>
          {/* Flaw: missing aria-label or accessible name for screen readers */}
          <button onClick={() => onDeleteTask(task.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
};
