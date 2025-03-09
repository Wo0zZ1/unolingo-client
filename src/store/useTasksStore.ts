import { create } from 'zustand'
import sleep from '../utils/sleep' 

export interface ITaskWordPicker {
	type: 'wordPicker'
	options: string[]
}

export interface ITaskTextInput {
	type: 'textInput'
	partialAnswer: [string, string]
}

export type ITask = (ITaskWordPicker | ITaskTextInput) & {
	id: number
	question: string
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
				question:
					"Hello! My name is Max. Now, I'm programming this application!",
				options: [
					'Привет!',
					'Меня',
					'зовут',
					'Максим.',
					'Сейчас',
					'я',
					'программирую',
					'это',
					'приложение!',
				],
				correctAnswer:
					'Привет! Меня зовут Максим. Сейчас я программирую это приложение!',
			},
			{
				id: 2,
				type: 'textInput',
				question: 'Я люблю программировать.',
				partialAnswer: ['I', 'programming.'],
				correctAnswer: 'like',
			},
		]

		set(prev => ({
			...prev,
			fetching: false,
			tasks: currentTasks,
		}))
	},
}))
