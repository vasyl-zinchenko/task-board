<template>
  <div
    class="task-card font-semibold mb-2 p-2 border-2 rounded-2xl relative border-2 bg-[white]"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @dragover.prevent="onDragOver"
  >
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold text-gray-800 pr-5">{{ task.title }}</p>

      <div class="flex gap-2">
        <Icon
          @click="isEditing = true"
          class="edit"
          name="material-symbols:edit-square-outline"
        />
        <Icon
          @click="isDeleting = true"
          class="delete"
          name="material-symbols:delete-outline"
        />
      </div>
    </div>

    <p class="text-sm text-gray-600 mt-2">
      {{ task.description }}
    </p>

    <div class="mt-4">
      <p class="text-sm font-semibold">
        Assignee: <span class="font-normal"> {{ task.assignee }}</span>
      </p>
      <p class="text-sm font-semibold">
        Performers:
        <span class="font-normal">{{ task.performers.join(', ') }}</span>
      </p>
    </div>
    <div class="mt-4 flex justify-between items-center">
      <span
        class="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded"
        >{{ task.status }}</span
      >
      <span
        class="block px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded"
        :style="priorityColor"
        >{{ task.priority }}</span
      >
    </div>
  </div>

  <SaveModal
    v-if="isEditing"
    @close="isEditing = false"
    :status="task.status"
    :task="task"
    :column="column"
  />

  <DeleteModal
    v-if="isDeleting"
    @close="isDeleting = false"
    :task="task"
    :column="column"
  />
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';
const taskStore = useTaskStore();

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
  task: {
    type: Object,
    default: () => {},
  },
  column: {
    type: Object,
    default: () => {},
  },
  create: {
    type: Boolean,
    default: false,
  },
  taskIndex: Number,
  columnIndex: Number,
  color: String,
});

const isEditing = ref(false);
const isDeleting = ref(false);
const isDragStart = ref(false);
const isDragOver = ref(false);

const onDragStart = () => {
  isDragStart.value = true;
  taskStore.onDragStart(props.task, props.columnIndex, props.taskIndex);
};

const onDragOver = () => {
  isDragOver.value = true;
  isDragStart.value = false;
  taskStore.onDragOverTask(props.taskIndex);
};

const priorityColor = computed(() => {
  switch (props.task?.priority) {
    case 'High':
      return {
        color: '#d32f2f',
        backgroundColor: '#f8d7da',
      };
    case 'Medium':
      return {
        color: '#f57c00',
        backgroundColor: '#ffecb3',
      };
    default:
      return {
        color: '#388e3c',
        backgroundColor: '#d0f0d0',
      };
  }
});
</script>

<style scoped>
.task-card {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.iconify {
  cursor: pointer;
  transition: 0.3s;
}

.edit:hover {
  background: green;
}

.delete:hover {
  background: red;
}
</style>
