import { create } from 'zustand'

import sleep from '../utils/sleep'

export type ITheoryBlock = {
	title: string
	paragraphs: string[]
}

export type ITheoryData = {
	id: number
	name: string
	theoryBlocks: ITheoryBlock[]
}

type ITheoryStatePending = {
	theoryData: null
	fetching: true
}

type ITheoryStateFullfield = {
	theoryData: ITheoryData
	fetching: false
}

type TheoryStore = (ITheoryStatePending | ITheoryStateFullfield) & {
	fetchTheory: (theoryId: number) => Promise<void>
}

export const useTheoryStore = create<TheoryStore>(set => ({
	theoryData: null,
	fetching: true,

	fetchTheory: async theoryId => {
		set({ theoryData: null, fetching: true })

		// TODO Подключить сервер
		// const response = await fetch('https://api.example.com/theory/id')
		// const data = await response.json()

		// Mock data
		console.log(`Типа идет фетчинг теории для секции с id ${theoryId}`)

		await sleep(1000)

		const currentTheory: ITheoryData =
			theoryId === 0
				? {
						id: 0,
						name: 'Present Simple',
						theoryBlocks: [
							{
								title: 'Когда используется:',
								paragraphs: [
									'Present Simple используется для описания регулярных действий...',
									'Как я могу написать теорию по грамматике языка, которого я вообще не знаю?',
									'Наверное, я делаю что-то не так в этой жизни',
								],
							},
							{
								title: 'Примеры:',
								paragraphs: [
									'Я пример 1...',
									'А я пример два баляяяяяяяяяя я пример два баляяяяяяяяяя я пример два баляяяяяяяяяя...',
									'Используйте выаываываыавх случааыфваях, когда уааааааааааааа...',
								],
							},
						],
				  }
				: {
						id: 1,
						name: 'Past Simple',
						theoryBlocks: [
							{
								title: 'Когда используется:',
								paragraphs: [
									'Past Simple используется для описания завершенных действий...',
									'Он часто фываы аыв аыва ыв...',
									'Используйте Past Simple только в тех случаях, когда...',
								],
							},
							{
								title: 'Примеры:',
								paragraphs: [
									'Я пример 1...',
									'А я пример два баляяяяяяяяяя аваыф я пример два баляяяяяяяяяя аваыфвааываыфвыавОн час я пример два баляяяяяяяяяя аваыфвааываыфвыавОн час я пример два баляяяяяяяяяя аваыфвааываыфвыавОн часвааываыфвыавОн часто фываы аыв аыва ыв...',
									'Используйте выаываываыавх случааыфваях, когда...',
								],
							},
						],
				  }

		set({
			fetching: false,
			theoryData: currentTheory,
		})
	},
}))
