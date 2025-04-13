import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth.js';
import { CheckCircle, ClipboardList } from 'lucide-react';

const TaskCount = () => {
  const { completedTasks, totalTasks, countTask, countCompletedTask } = useAuthStore();

  useEffect(() => {
    countCompletedTask();
    countTask();
  }, []);

  const percentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📊 Task Overview</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <ClipboardList className="text-blue-600 dark:text-blue-300 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Tasks</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{totalTasks}</p>
          </div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl flex items-center gap-4 shadow-sm">
          <CheckCircle className="text-green-600 dark:text-green-300 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{completedTasks}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Completion Progress</p>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{percentage}% done</p>
      </div>
    </div>
  );
};

export default TaskCount;
