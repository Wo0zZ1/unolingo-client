import { create } from 'zustand'
import sleep from '../../utils/sleep'

export type TaskType = 'wordPicker' | 'textInput'

export interface ITask {
	id: number
	type: TaskType
	question: string
	options?: string[]
	correctAnswer: string
}

type TasksStore = {
	tasks: ITask[]
	fetching: boolean

	fetchTasks: (levelId: number) => Promise<void>
}

export const useTasksStore = create<TasksStore>(set => ({
	tasks: [],
	fetching: true,

	fetchTasks: async levelId => {
		set(prev => ({ ...prev, fetching: true }))

		// TODO Подключить сервер
		// const response = await fetch('https://api.example.com/user')
		// const data = await response.json()

		// Mock data
		console.log(
			`Типа идет фетчинг заданий для уровня с id ${levelId}`,
		)

		await sleep(1000)

		const currentTasks: ITask[] = [
			{
				id: 1,
				type: 'wordPicker',
				question: 'Переведите предложение: "Я люблю программировать"',
				options: ['Я', 'люблю', 'программировать'],
				correctAnswer: 'Я люблю программировать',
			},
			{
				id: 2,
				type: 'textInput',
				question:
					'Введите пропущенное слово: "Я ___ программировать."',
				correctAnswer: 'люблю',
			},
		]

		set(prev => ({
			...prev,
			fetching: false,
			tasks: currentTasks,
		}))
	},
}))
