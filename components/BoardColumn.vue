<script setup>
import { useBoardStore } from "@/stores/boardStore";

defineProps({
    column: {
        type: Object,
        required: true,
    },
    columnIndex: {
        type: Number,
        required: true,
    },
});
const boardStore = useBoardStore();
const router = useRouter();

const editNameState = ref(false);

const deleteColumn = (columnIndex) => {
    boardStore.deleteColumn(columnIndex);
}

const goToPage = (id) => {
    router.push(`/tasks/${id}`);
}
</script>

<template>
    <UContainer class="column">
        <div class="column-header mb-4">
            <div>
                <UInput
                    v-if="editNameState"
                    type="text"
                    v-model="column.name"
                />
                <h2 v-else>{{ column.name }}</h2>
            </div>
            <div class="mb-4">
                <UButton
                    icon="i-heroicons-pencil-square"
                    class="mr-1"
                    @click="editNameState = !editNameState"
                />
                <UButton
                    icon="i-heroicons-trash"
                    color="red"
                    @click="deleteColumn(columnIndex)"
                />
            </div>
        </div>
        <ul>
            <li v-for="task in column.tasks" :key="task.id">
                <UCard class="mb-4" @click="goToPage(task.id)">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>

        </ul>
    </UContainer>
</template>
