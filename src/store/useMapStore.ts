import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export interface ISectionData {
	id: number
	order: number
	name: string
	languageId: number
}

export type IMapData = {
	sections: ISectionData[]
}

type IMapState = {
	mapData: IMapData | null
	fetching: boolean
}

type MapStore = IMapState & {
	fetchMapData: (languageId?: number | null) => Promise<void>
	reset: () => void
}

export const useMapStore = create<MapStore>(set => ({
	mapData: null,
	fetching: false,

	fetchMapData: async languageId => {
		if (!languageId) return set({ mapData: null, fetching: false })
		set({ mapData: null, fetching: true })

		const { data: sectionData } = await $api.get<ISectionData[]>(
			`api/sections/language/${languageId}`,
		)

		set({
			fetching: false,
			mapData: { sections: sectionData },
		})
	},

	reset: () => set(() => ({ mapData: null, fetching: false })),
}))
