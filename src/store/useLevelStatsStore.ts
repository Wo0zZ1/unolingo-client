import { create } from 'zustand'
import { $api } from '../navigation/AuthContext'

interface ILevelStatsRequest {
	levelGlobalOrder: number
	errors: number
	time: number
}

interface ILevelStatsResponse {
	experience: number
	experienceToNextLevel: number
	levelUp: boolean
}

interface ILevelStatsData {
	errors: number
	startTime: number | null
	endTime: number | null
}

type LevelStatsState = {
	levelStatsData: ILevelStatsData
	levelStatsResponse: ILevelStatsResponse | null
	fetching: boolean
}

type LevelStatsStore = LevelStatsState & {
	fetchResult: (
		oldData: ILevelStatsData,
		levelId: number,
		levelGlobalOrder: number,
	) => Promise<void>
	incrementErrors: () => void
	startTimer: () => void
	stopTimer: () => void
	reset: () => void
}

export const useLevelStatsStore = create<LevelStatsStore>(set => ({
	levelStatsData: { errors: 0, startTime: null, endTime: null },
	levelStatsResponse: null,
	fetching: false,

	fetchResult: async (oldData: ILevelStatsData, levelId: number, levelGlobalOrder: number) => {
		if (!oldData.startTime || !oldData.endTime) return

		set({
			fetching: true,
		})

		const { data } = await $api.post<ILevelStatsRequest, { data: ILevelStatsResponse }>(
			`api/levels/complete/${levelId}`,
			{
				errors: oldData.errors,
				time: (oldData.endTime - oldData.startTime) / 1000,
				levelGlobalOrder: levelGlobalOrder,
			},
		)

		set({ fetching: false, levelStatsResponse: data })
	},

	incrementErrors: () =>
		set(prev => ({
			levelStatsData: { ...prev.levelStatsData, errors: prev.levelStatsData.errors + 1 },
		})),
	startTimer: () =>
		set(prev => ({ levelStatsData: { ...prev.levelStatsData, startTime: Date.now() } })),
	stopTimer: () =>
		set(prev => ({ levelStatsData: { ...prev.levelStatsData, endTime: Date.now() } })),
	reset: () =>
		set(() => ({
			levelStatsResponse: null,
			levelStatsData: { errors: 0, startTime: null, endTime: null },
		})),
}))
