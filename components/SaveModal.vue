<template>
  <Teleport to="body">
    <div
      class="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-full max-w-lg rounded-lg p-6">
        <p class="text-lg font-bold mb-4">New task</p>

        <form @submit.prevent="saveTask">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-1"
              >Title</label
            >

            <input
              id="title"
              v-model="newTask.title"
              type="text"
              class="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-sm font-medium mb-1"
              >Description</label
            >
            <textarea
              id="description"
              v-model="newTask.description"
              class="w-full border rounded-lg p-2"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="assignee" class="block text-sm font-medium mb-1"
              >Responsible</label
            >
            <input
              id="assignee"
              v-model="newTask.assignee"
              type="text"
              class="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div class="mb-4">
            <label for="performers" class="block text-sm font-medium mb-1"
              >Performers</label
            >
            <input
              id="performers"
              v-model="newTask.performers"
              type="text"
              placeholder="Separate by commas"
              class="w-full border rounded-lg p-2"
            />
          </div>

          <div class="mb-4">
            <label for="status" class="block text-sm font-medium mb-1"
              >Status</label
            >
            <select
              id="status"
              v-model="newTask.status"
              class="w-full border rounded-lg p-2"
              required
            >
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="priority" class="block text-sm font-medium mb-1"
              >Priority</label
            >
            <select
              id="priority"
              v-model="newTask.priority"
              class="w-full border rounded-lg p-2"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {{ create ? 'Add' : 'Edit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';
import { uuid } from 'vue-uuid';

const taskStore = useTaskStore();

const emits = defineEmits(['close']);
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
});

const closeModal = () => emits('close');

const newTask = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
  assignee: props.task?.assignee || '',
  performers: props.task?.performers || '',
  status: props.column?.title || props.task?.status,
  priority: props.task?.priority || '',
});

const saveTask = () => {
  if (!props.create) {
    taskStore.updateTask(props.column.id, props.task.id, newTask.value);
    closeModal();
    return;
  }

  const performersArray = newTask.value.performers
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p);

  const task = {
    id: uuid.v4(),
    ...newTask.value,
    performers: performersArray,
  };
  taskStore.addTask(newTask.value.status, task);

  closeModal();
};
</script>

<style scoped></style>
