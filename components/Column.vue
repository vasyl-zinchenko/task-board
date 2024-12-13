<template>
  <div
    class="task-column min-w-[200px] max-w-[390px]"
    @dragover.prevent
    @drop="taskStore.onDropTask(columnIndex)"
  >
    <p
      class="column-title text-xl font-semibold mb-2 py-1 border-2 rounded-2xl text-center"
      :style="{ backgroundColor: column.color }"
    >
      {{ column.title }}
    </p>

    <div
      class="flex flex-col gap-1 task-list p-2 rounded-md"
      :style="{ backgroundColor: column.color }"
    >
      <button
        @click="addTask"
        class="add-button flex items-center justify-center gap-5"
      >
        <span>Add task</span>
        <Icon
          @click="openModal = true"
          class=""
          name="material-symbols:add-circle-outline"
        />
      </button>

      <TaskCard
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        :task="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
        :column="column"
      />
    </div>
  </div>

  <SaveModal
    v-if="openModal"
    @close="openModal = false"
    :column="column"
    :create="true"
  />
</template>

<script setup>
import { useTaskStore } from '../store/taskStore';
const taskStore = useTaskStore();

const props = defineProps({
  column: {
    type: Object,
    default: () => {},
  },
  columnIndex: {
    type: Number,
    default: 0,
  },
});

const openModal = ref(false);

const addTask = () => {
  openModal.value = true;
};
</script>

<style scoped>
.column-title {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.add-button {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 2px 7px 3px;
  border-radius: 5px;
  padding: 5px 0;
  transition: 0.2s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.4) 0px 2px 7px 3px;
  }
}
</style>
