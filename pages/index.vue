<template>
  <div class="task-dashboard max-w-[1200px] min-w-[800px] m-auto mb-4">
    <Loader v-if="status === 'pending'" />

    <div class="mt-4">
      <div class="grid grid-cols-3 gap-4" v-if="columns">
        <Column
          v-for="(column, columnIndex) in columns"
          :key="column.id"
          :columnIndex="columnIndex"
          :column="column"
        />
      </div>
    </div>

    <div v-if="error" class="text-3xl">Something went wrong</div>
  </div>
</template>

<script setup>
import { useTaskStore } from './store/taskStore';
const taskStore = useTaskStore();

const { data, error, status, refresh } = await useFetch(
  'https://vue-http-demo-c46ab-default-rtdb.europe-west1.firebasedatabase.app/tasks.json/'
);

if (data) taskStore.setColumns(data.value);

const columns = computed(() => taskStore.columns);
</script>
