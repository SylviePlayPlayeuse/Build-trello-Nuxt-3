<script setup>
import { useBoardStore } from '@/stores/boardStore';

const route = useRoute()
const boardStore = useBoardStore()

const task = computed(() => {
    return boardStore.getTask(route.params.id)
})

</script>

<template>
    <div class="task-wrapper">
        <div class="task-view">
            <p>{{ task.name }}</p>
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>