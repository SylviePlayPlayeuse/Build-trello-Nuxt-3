<script setup>
import { useBoardStore } from "@/stores/boardStore";

const props = defineProps({
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
const newTaskName = ref('');

const addTask = () => {
    boardStore.addTask({
        columnIndex: props.columnIndex,
        taskName: newTaskName.value}
    );
    newTaskName.value = '';
}

const deleteColumn = (columnIndex) => {
    boardStore.deleteColumn(columnIndex);
}

const goToPage = (id) => {
    router.push(`/tasks/${id}`);
}

const pickupTask = (event, { fromColumnIndex, fromTaskIndex }) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('from-column-index', fromColumnIndex);
    event.dataTransfer.setData('from-task-index', fromTaskIndex);
    event.dataTransfer.setData('type', 'task');
}

const dropItem = (event, toColumnIndex) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('type');

    if (type === 'task') {
        const columnIndex = event.dataTransfer.getData('from-column-index');
        const taskIndex = event.dataTransfer.getData('from-task-index');

        boardStore.moveTask({
            taskIndex: taskIndex,
            fromColumnIndex: columnIndex,
            toColumnIndex: toColumnIndex,
        });
    } else if (type === 'column') {
        const fromColumnIndex = event.dataTransfer.getData('from-column-index');
        boardStore.moveColumn({
            fromColumnIndex: fromColumnIndex,
            toColumnIndex: toColumnIndex,
        });
    }
}

const pickupColumn = (event, fromColumnIndex) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('type', 'column');
    event.dataTransfer.setData('from-column-index', fromColumnIndex);

}

</script>

<template>
    <UContainer
        class="column"
        draggable="true"
        @dragstart="pickupColumn($event, columnIndex)"
        @drop.stop="dropItem($event, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
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
            <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
                <UCard
                    class="mb-4"
                    draggable="true"
                    @click="goToPage(task.id)"
                    @dragstart="pickupTask($event, {
                        fromTaskIndex: taskIndex,
                        fromColumnIndex: columnIndex,
                    })"
                >
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>

        </ul>
        <UInput
            v-model="newTaskName"
            type="text"
            placeholder="+ Create new task"
            icon="i-heroicons-plus-circle-solid"
            @keyup.enter="addTask"
        />
    </UContainer>
</template>
