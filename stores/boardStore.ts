import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import boardData from '@/data/board.json'
import { useStorage } from '@vueuse/core'

export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData)

    const getTask = computed(() => {
        return (taskId: string) => {
            for (const column of board.value.columns) {
                const task = column.tasks.find(task => task.id === taskId)
                if (task) {
                    return task
                }
            }
        }
    })

    const addColumn = (columnName: string): void => {
        board.value.columns.push({
            id: uuid(),
            name: columnName,
            tasks: [],
        })
    }

    const deleteColumn = (columnIndex: number): void => {
        board.value.columns.splice(columnIndex, 1)
    }
    interface AddTaskParams {
        columnIndex: number;
        taskName: string;
    }

    const addTask = ({ columnIndex, taskName }: AddTaskParams): void => {
        board.value.columns[columnIndex].tasks.push({
            id: uuid(),
            name: taskName,
            description: '',
        })
    }

    const deleteTask = (taskId: string): void => {
        for (const column of board.value.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1)
            }
        }
    }

    const moveTask = ({ taskIndex, fromColumnIndex, toColumnIndex}: { taskIndex: number, fromColumnIndex: number, toColumnIndex: number }): void => {
        const task = board.value.columns[fromColumnIndex].tasks.splice(taskIndex, 1)[0]
        board.value.columns[toColumnIndex].tasks.push(task)
    }

    const moveColumn = ({ fromColumnIndex, toColumnIndex }: { fromColumnIndex: number, toColumnIndex: number }): void => {
        const column = board.value.columns.splice(fromColumnIndex, 1)[0]
        board.value.columns.splice(toColumnIndex, 0, column)
    }


    return {
        addColumn,
        addTask,
        board,
        deleteColumn,
        deleteTask,
        getTask,
        moveTask,
        moveColumn,
    }
})
