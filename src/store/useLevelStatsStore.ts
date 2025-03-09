import { create } from 'zustand'

type LevelStats = {
	errors: number
	startTime: number | null
	endTime: number | null
	incrementErrors: () => void
	startTimer: () => void
	stopTimer: () => void
	resetStats: () => void
}

export const useLevelStatsStore = create<LevelStats>(set => ({
	errors: 0,
	startTime: null,
	endTime: null,
	incrementErrors: () => set(state => ({ errors: state.errors + 1 })),
	startTimer: () => set({ startTime: Date.now() }),
	stopTimer: () => set({ endTime: Date.now() }),
	resetStats: () =>
		set({ errors: 0, startTime: null, endTime: null }),
}))
