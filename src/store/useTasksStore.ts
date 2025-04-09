import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export type ITaskType = 'WORD_PICKER' | 'TEXT_INPUT'

export interface ITaskData {
	id: number
	type: ITaskType
	question: string
	correctAnswer: string
	options: string[]
	partialAnswer: string[]
	order: number
}

export type ITasksState = {
	tasksData: ITaskData[] | null
	fetching: boolean
}

type TasksStore = ITasksState & {
	fetchTasks: (levelId: number) => Promise<void>
	reset: () => void
}

export const useTasksStore = create<TasksStore>(set => ({
	tasksData: null,
	fetching: false,

	fetchTasks: async (levelId: number) => {
		set(prev => ({ ...prev, fetching: true }))

		const { data } = await $api.get<ITaskData[]>(`/api/tasks/level/${levelId}`)

		set(prev => ({
			...prev,
			fetching: false,
			tasksData: data,
		}))
	},

	reset: () => set(() => ({ tasksData: null, fetching: false })),
}))
