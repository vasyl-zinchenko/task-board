<template>
  <Teleport to="body">
    <div
      class="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-full max-w-lg rounded-lg p-6">
        <p class="text-lg font-bold mb-8">
          Are you sure you want to delete this task?
        </p>

        <form @submit.prevent="confirm">
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              @click="taskStore.deleteTask(props.column.id, props.task.id)"
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';
const taskStore = useTaskStore();

const emits = defineEmits(['close']);
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  column: {
    type: Object,
    default: () => {},
  },
});

const closeModal = () => emits('close');
</script>

<style scoped></style>
