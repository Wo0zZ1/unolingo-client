import { create } from 'zustand'

type ScoreState = {
	score: number
	addScore: (points: number) => void
}

export const useScoreStore = create<ScoreState>(set => ({
	score: 0,
	addScore: points => set(state => ({ score: state.score + points })),
}))
