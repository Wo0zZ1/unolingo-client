import { create } from 'zustand'
import sleep from '../utils/sleep'

export type ITheory = {
	id: number
	title: string
	paragraphs: string[]
}

type ITheoryStatePending = {
	theory: null
	fetching: true
}

type ITheoryStateFullfield = {
	theory: ITheory
	fetching: false
}

type TheoryStore = (ITheoryStatePending | ITheoryStateFullfield) & {
	fetchTheory: (theoryId: number) => Promise<void>
}

export const useTheoryStore = create<TheoryStore>(set => ({
	theory: null,
	fetching: true,

	fetchTheory: async theoryId => {
		set(prev => ({ ...prev, theory: null, fetching: true }))

		// TODO Подключить сервер
		// const response = await fetch('https://api.example.com/theory/id')
		// const data = await response.json()

		// Mock data
		console.log(`Типа идет фетчинг теории для секции с id ${theoryId}`)

		await sleep(1000)

		const currentTheory: ITheory = {
			id: 1,
			title: 'Past Simple',
			paragraphs: [
				'Past Simple используется для описания завершенных действий...',
				'Он часто фываы аыв аыва ыв...',
				'Используйте Past Simple только в тех случаях, когда...',
			],
		}

		set(prev => ({
			...prev,
			fetching: false,
			theory: currentTheory,
		}))
	},
}))
