import { defineStore } from 'pinia'
import boardData from '@/data/board.json'
import { useStorage } from "@vueuse/core";

export const useBoardStore = defineStore('boardStore', () =>{
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
            name: columnName,
            tasks: [],
        })
    }

    const deleteColumn = (columnIndex: number): void => {
        board.value.columns.splice(columnIndex, 1)
    }

    return {
        addColumn,
        board,
        deleteColumn,
        getTask,
    }
})
