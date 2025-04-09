import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'
import sleep from '../utils/sleep'

export type ILeaderboardData = {
	username: string
	level: number
	currentExp: number
	experienceToNextLevel: number
	totalExp: number
	streakDays: number
	lastActive: Date
}

type ILeaderboardState = {
	leaderboardData: ILeaderboardData[] | null
	fetching: boolean
}

export type LeaderboardActions = {
	fetchLeaderboardData: () => Promise<void>
	reset: () => void
}

export type LeaderboardStateStore = ILeaderboardState & LeaderboardActions

export const useLeaderboardStore = create<LeaderboardStateStore>(set => ({
	leaderboardData: null,
	fetching: false,

	fetchLeaderboardData: async () => {
			set(prev => ({ ...prev, fetching: true }))

			const { data } = await $api.get<ILeaderboardData[]>('api/stats/leaderboard')

			await sleep(1000)

			set({
				fetching: false,
				leaderboardData: data.map(item => ({ ...item, lastActive: new Date(item.lastActive) })),
			})
	},

	reset: () => {
		try {
			set(() => ({ leaderboardData: null, fetching: false }))
		} catch (error) {}
	},
}))
