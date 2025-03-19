import { create } from 'zustand'

import sleep from '../utils/sleep'

import { ITheoryData } from './useTheoryStore'

export interface ILevelData {
	id: number
	isOpened: boolean
	isCompleted: boolean
}

export type IMapSection = {
	id: number
	section: number
	partialTheoryData: Pick<ITheoryData, 'id' | 'name'>
	levelsData: ILevelData[]
}

export type IMapData = {
	id: number
	mapSections: IMapSection[]
}

type IMapStatePending = {
	mapData: null
	fetching: true
}

type IMapStateFullfield = {
	mapData: IMapData
	fetching: false
}

type MapStore = (IMapStatePending | IMapStateFullfield) & {
	fetchMap: (mapId: number) => Promise<void>
}

export const useMapStore = create<MapStore>(set => ({
	mapData: null,
	fetching: true,

	fetchMap: async mapId => {
		set({ mapData: null, fetching: true })

		// TODO Подключить сервер
		// const response = await fetch('https://api.example.com/map/id')
		// const data = await response.json()

		// Mock data
		console.log(`Типа идет фетчинг карты с id ${mapId}`)

		await sleep(1000)

		const currentMap: IMapData =
			mapId === 0
				? {
						id: 0,
						mapSections: [
							{
								id: 0,
								section: 1,
								partialTheoryData: { id: 0, name: 'Present Simple' },
								levelsData: [
									{ id: 1, isOpened: true, isCompleted: true },
									{ id: 2, isOpened: true, isCompleted: true },
									{ id: 3, isOpened: true, isCompleted: true },
									{ id: 4, isOpened: true, isCompleted: true },
									{ id: 5, isOpened: true, isCompleted: true },
								],
							},
							{
								id: 1,
								section: 2,
								partialTheoryData: { id: 1, name: 'Past Simple' },
								levelsData: [
									{ id: 6, isOpened: true, isCompleted: true },
									{ id: 7, isOpened: true, isCompleted: true },
									{ id: 8, isOpened: true, isCompleted: true },
									{ id: 9, isOpened: true, isCompleted: false },
									{ id: 10, isOpened: false, isCompleted: false },
								],
							},
							{
								id: 2,
								section: 3,
								partialTheoryData: { id: 2, name: 'Future Simple' },
								levelsData: [
									{ id: 11, isOpened: false, isCompleted: false },
									{ id: 12, isOpened: false, isCompleted: false },
									{ id: 13, isOpened: false, isCompleted: false },
									{ id: 14, isOpened: false, isCompleted: false },
									{ id: 15, isOpened: false, isCompleted: false },
								],
							},
						],
				  }
				: {
						id: 1,
						mapSections: [
							{
								id: 5,
								section: 1,
								partialTheoryData: { id: 1242, name: 'Немецкий язык 1' },
								levelsData: [
									{ id: 1, isOpened: true, isCompleted: true },
									{ id: 2, isOpened: true, isCompleted: true },
									{ id: 3, isOpened: true, isCompleted: false },
									{ id: 4, isOpened: false, isCompleted: false },
									{ id: 5, isOpened: false, isCompleted: false },
								],
							},
							{
								id: 165,
								section: 2,
								partialTheoryData: { id: 13245, name: 'Немецкий язык 2' },
								levelsData: [
									{ id: 6, isOpened: false, isCompleted: false },
									{ id: 7, isOpened: false, isCompleted: false },
									{ id: 8, isOpened: false, isCompleted: false },
									{ id: 9, isOpened: false, isCompleted: false },
									{ id: 10, isOpened: false, isCompleted: false },
								],
							},
							{
								id: 24356,
								section: 3,
								partialTheoryData: { id: 232453, name: 'Немецкий язык 3' },
								levelsData: [
									{ id: 11, isOpened: false, isCompleted: false },
									{ id: 12, isOpened: false, isCompleted: false },
									{ id: 13, isOpened: false, isCompleted: false },
									{ id: 14, isOpened: false, isCompleted: false },
									{ id: 15, isOpened: false, isCompleted: false },
								],
							},
						],
				  }

		set({
			fetching: false,
			mapData: currentMap,
		})
	},
}))
