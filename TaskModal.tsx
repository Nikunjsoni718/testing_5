import React, { useState } from 'react';
// Updated to import directly from the same folder
import { Task } from './TaskList';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      category: 'feature',
      completed: false,
      priority,
    });
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description (supports preview)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Security Flaw: Unsanitized HTML rendering allows XSS injection */}
          <div 
            className="preview-pane"
            dangerouslySetInnerHTML={{ __html: description }} 
          />
          <div className="actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};
