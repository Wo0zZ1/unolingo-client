import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export type IUserStatData = {
	level: number
	currentExp: number
	experienceToNextLevel: number
	totalExp: number
	streakDays: number
	lastActive: Date
}

type IUserStatState = {
	userStatData: IUserStatData | null
	fetching: boolean
}

export type UserStatActions = {
	fetchUserStatData: () => Promise<void>
	reset: () => void
}

export type UserStatStateStore = IUserStatState & UserStatActions

export const useUserStatStore = create<UserStatStateStore>(set => ({
	userStatData: null,
	fetching: false,

	fetchUserStatData: async () => {
		set(prev => ({ ...prev, fetching: true }))

		const { data } = await $api.get<IUserStatData>('api/stats/me')

		set({
			fetching: false,
			userStatData: data,
		})
	},
	reset: () =>
		set(() => ({
			userStatData: null,
			fetching: false,
		})),
}))
