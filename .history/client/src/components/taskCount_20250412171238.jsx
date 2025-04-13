import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth.js';

const TaskCount = () => {
    const { completedTasks, totalTasks, countTask, countCompletedTask } = useAuthStore();

    useEffect(() => {
        countCompletedTask();
        countTask();
    }, []);

    return (
        <div>
            <h2>Task Summary</h2>
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
        </div>
    );
};

export default TaskCount;
