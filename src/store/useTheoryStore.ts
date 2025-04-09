import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export type ITheoryParagraph = {
	title: string
	items: string[]
}

export type ITheoryData = {
	id: number
	title: string
	paragraphs: ITheoryParagraph[]
}

type ITheoryState = {
	theoryData: ITheoryData | null
	fetching: boolean
}

type TheoryStore = ITheoryState & {
	fetchTheory: (theoryId: number) => Promise<void>
	reset: () => void
}

export const useTheoryStore = create<TheoryStore>(set => ({
	theoryData: null,
	fetching: false,

	fetchTheory: async (sectionId: number) => {
		set({ theoryData: null, fetching: true })

		const { data } = await $api.get<ITheoryData>(`/api/theory/section/${sectionId}`)

		set({
			fetching: false,
			theoryData: data,
		})
	},

	reset: () => set(() => ({ theoryData: null, fetching: false })),
}))
