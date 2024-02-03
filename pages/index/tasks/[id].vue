<script setup>
import { useBoardStore } from '@/stores/boardStore';

const route = useRoute()
const boardStore = useBoardStore()
const router = useRouter()
const toast = useToast()

const task = computed(() => {
    return boardStore.getTask(route.params.id)
})

const deleteTask = () => {
    if (task) {
        toast.add({
            title: 'Task deleted',
            description: `${task.value.name} has been deleted`,
            icon: 'i-heroicons-trash',
            color: 'red',
        })
        boardStore.deleteTask(task.value.id)
        router.push('/')
    }
}

</script>

<template>
    <div class="task-wrapper">
        <div v-if="task" class="task-view">
            <UFormGroup label="name" class="mb-4 w-full">
                <UInput type="text" v-model="task.name" />
            </UFormGroup>
            <UFormGroup label="description" class="w-full mb-4">
                <UTextarea v-model="task.description" />
            </UFormGroup>
            <UButton
                icon="i-heroicons-trash"
                color="red"
                @click="deleteTask()"
            >
                Delete Task
            </UButton>
        </div>
        <div v-else>
            <p>Task not found</p>
        </div>
    </div>
</template>