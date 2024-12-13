import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const columns = ref();
  const draggedTask = ref(null);
  const dragSourceColumnIndex = ref(null);
  const dragSourceTaskIndex = ref(null);
  const dragOverTaskId = ref(null);
  const dragOverColumnIndex = ref(null);

  const setColumns = (data) => (columns.value = data);

  function onDragStart(task, columnIndex, taskIndex) {
    draggedTask.value = task;
    dragSourceColumnIndex.value = columnIndex;
    dragSourceTaskIndex.value = taskIndex;
  }

  function onDragOverTask(taskIndex) {
    dragOverTaskId.value = taskIndex;
    dragOverColumnIndex.value = dragSourceColumnIndex.value;
  }

  function onDropTask(targetColumnIndex) {
    if (draggedTask.value && dragSourceColumnIndex.value !== null) {
      const sourceColumn = columns.value[dragSourceColumnIndex.value];
      const targetColumn = columns.value[targetColumnIndex];

      sourceColumn.tasks.splice(dragSourceTaskIndex.value, 1);

      if (
        dragOverTaskId.value !== null &&
        dragOverColumnIndex.value === targetColumnIndex
      ) {
        targetColumn.tasks.splice(dragOverTaskId.value, 0, draggedTask.value);
      } else {
        draggedTask.value.status = targetColumn.title;
        columns.value[targetColumnIndex].tasks.splice(
          dragOverTaskId.value,
          0,
          draggedTask.value
        );
      }
    }

    draggedTask.value = null;
    dragSourceColumnIndex.value = null;
    dragSourceTaskIndex.value = null;
    dragOverTaskId.value = null;
    dragOverColumnIndex.value = null;
  }

  const addTask = (columnTitle, task) => {
    const column = columns.value.find((column) => column.title === columnTitle);

    if (column) column.tasks.push(task);
  };

  const updateTask = (columnId, taskId, updatedTask) => {
    const column = columns.value.find((column) => column.id === columnId);
    const index = column.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      column.tasks[index] = { ...column.tasks[index], ...updatedTask };

      if (updatedTask.status !== column.title) {
        column.tasks.splice(index, 1);
        const newColumn = columns.value.find(
          (column) => column.title === updatedTask.status
        );

        if (newColumn) newColumn.tasks.push(updatedTask);
      }
    }
  };

  const deleteTask = (columnId, taskId) => {
    const column = columns.value.find((column) => column.id === columnId);
    const index = column.tasks.findIndex((task) => task.id === taskId);
    column.tasks.splice(index, 1);
  };

  return {
    columns,
    draggedTask,
    dragSourceColumnIndex,
    dragSourceTaskIndex,
    dragOverTaskId,
    dragOverColumnIndex,
    addTask,
    updateTask,
    onDragStart,
    onDragOverTask,
    onDropTask,
    deleteTask,
    setColumns,
  };
});
