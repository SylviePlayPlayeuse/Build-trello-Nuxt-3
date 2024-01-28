<script setup>
import { useBoardStore } from '@/stores/boardStore';

const boardStore = useBoardStore();
const route = useRoute();
const router = useRouter();

const editNameState = ref(false);
const newColumnName = ref('');

const isModalOpen = computed(() => {
    return route.name === 'index-tasks-id'
});

const addColumn = () => {
    boardStore.addColumn(newColumnName.value);
    newColumnName.value = '';
}

const deleteColumn = (columnIndex) => {
    boardStore.deleteColumn(columnIndex);
}

const goToPage = (id) => {
    router.push(`/tasks/${id}`);
}

const closeModal = () => {
    router.push('/');
}

</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <UContainer
                v-for="(column, columnIndex) in boardStore.board.columns"
                :key="column.id"
                class="column"
            >
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
            <UContainer class="column">
                <UInput
                    v-model="newColumnName"
                    type="text"
                    placeholder="+ Create new column"
                    icon="i-heroicons-plus-circle-solid"
                    @keyup.enter="addColumn"
                />
            </UContainer>
        </main>
        <div class="task-bg" v-show="isModalOpen" @click.self="closeModal">
            <NuxtPage :key="route.fullPath"/>
        </div>
    </div>
</template>