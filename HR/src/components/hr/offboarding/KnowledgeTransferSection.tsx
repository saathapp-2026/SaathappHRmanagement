'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { OffboardingRecord, KnowledgeTransferTask, KTTaskStatus } from '@/data/hr/offboarding';

export function KnowledgeTransferSection({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [tasks, setTasks] = useState<KnowledgeTransferTask[]>(record.ktTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState<Partial<KnowledgeTransferTask>>({ status: 'Pending' });

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const totalCount = tasks.length;

  const handleAddTask = () => {
    if (!newTask.task || !newTask.owner || !newTask.dueDate) return;
    
    const taskToAdd: KnowledgeTransferTask = {
      id: `KT${Date.now()}`,
      task: newTask.task,
      owner: newTask.owner,
      dueDate: newTask.dueDate,
      description: newTask.description || '',
      status: 'Pending'
    };
    
    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    onUpdate({ ktTasks: updatedTasks });
    setIsAdding(false);
    setNewTask({ status: 'Pending' });
  };

  const updateTaskStatus = (id: string, status: KTTaskStatus) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, status } : t);
    setTasks(updatedTasks);
    onUpdate({ ktTasks: updatedTasks });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Knowledge Transfer</h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="p-0">
        {isAdding && (
          <div className="p-4 border-b border-gray-100 bg-blue-50/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Task Title *</label>
                <input 
                  type="text"
                  value={newTask.task || ''}
                  onChange={e => setNewTask({...newTask, task: e.target.value})}
                  className="w-full border border-gray-300 rounded text-sm px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Owner *</label>
                <input 
                  type="text"
                  value={newTask.owner || ''}
                  onChange={e => setNewTask({...newTask, owner: e.target.value})}
                  className="w-full border border-gray-300 rounded text-sm px-2 py-1"
                  placeholder="e.g. Vikram Sharma"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Due Date *</label>
                <input 
                  type="date"
                  value={newTask.dueDate || ''}
                  onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full border border-gray-300 rounded text-sm px-2 py-1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <input 
                type="text"
                value={newTask.description || ''}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
                className="w-full border border-gray-300 rounded text-sm px-2 py-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTask}
                disabled={!newTask.task || !newTask.owner || !newTask.dueDate}
                className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <ul className="divide-y divide-gray-100">
          {tasks.length === 0 && !isAdding ? (
            <li className="p-4 text-center text-sm text-gray-500">No KT tasks assigned.</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className="p-4 hover:bg-gray-50 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      task.status === 'Completed' ? 'bg-green-500' : 
                      task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <h4 className={`text-sm font-medium ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Owner: <span className="font-medium text-gray-700">{task.owner}</span></span>
                    <span>Due: <span className="font-medium text-gray-700">{task.dueDate}</span></span>
                  </div>
                </div>
                <div>
                  <select 
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value as KTTaskStatus)}
                    className={`text-xs border-gray-300 rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 ${
                      task.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                      task.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
