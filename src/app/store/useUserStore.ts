import { create } from 'zustand'
import sleep from '../../utils/sleep'

export type UserState = {
	level: number
	experience: number
	experienceTotal: number
	experienceToNextLevel: number
	createdAt: Date
}

export type UserActions = {
	setLevel: (level: number) => void
	addExperience: (experience: number) => void
	setExperience: (experience: number) => void
	setExperienceTotal: (experienceTotal: number) => void
	setExperienceToNextLevel: (experienceToNextLevel: number) => void
	setCreatedAt: (createdAt: Date) => void

	fetchUserData: () => Promise<void>
	fetching: boolean
}

export type UserStateStore = UserState & UserActions

// TODO 10 уровней
export const experienceToNextLevelMock = [
	100, 200, 300, 400, 500, 600, 700, 800,
]

export const useUserStore = create<UserStateStore>(set => ({
	level: 1,
	experience: 0,
	experienceTotal: 0,
	experienceToNextLevel: 0,
	createdAt: new Date(),
	fetching: true,

	// Методы для обновления состояния
	setLevel: level => set({ level }),
	addExperience: experience => {
		set(prev => {
			let newLevel = prev.level
			let newExperience = prev.experience + experience
			const newExperienceTotal = prev.experienceTotal + experience
			let newExperienceToNextLevel = prev.experienceToNextLevel

			// TODO FIX
			if (experience < newExperienceToNextLevel)
				newExperienceToNextLevel -= experience
			else {
				while (
					newExperience >= experienceToNextLevelMock[newLevel - 1]
				) {
					console.log('LEVEL UP')
					newExperience -= experienceToNextLevelMock[newLevel - 1]

					newLevel += 1

					newExperienceToNextLevel =
						experienceToNextLevelMock[newLevel - 1]
				}
				newExperienceToNextLevel -= newExperience
			}

			return {
				level: newLevel,
				experience: newExperience,
				experienceTotal: newExperienceTotal,
				experienceToNextLevel: newExperienceToNextLevel,
			}
		})
	},

	setExperience: experience => set({ experience }),
	setExperienceTotal: experienceTotal => set({ experienceTotal }),
	setExperienceToNextLevel: experienceToNextLevel =>
		set({ experienceToNextLevel }),
	setCreatedAt: createdAt => set({ createdAt }),

	// Метод для загрузки данных с сервера
	fetchUserData: async () => {
		try {
			set(prev => ({ ...prev, fetching: true }))

			// TODO Подключить сервер
			// const response = await fetch('https://api.example.com/user')
			// const data = await response.json()

			// Mock data
			console.log(`Типа идет фетчинг аккаунта`)

			await sleep(1000)

			const data: UserState = {
				level: 1,
				experience: 0,
				experienceTotal: 0,
				experienceToNextLevel: 100,
				createdAt: new Date(2024, 4, 27),
			}
			// TODO Подключить сервер

			set(prev => ({
				...prev,
				fetching: false,

				level: data.level,
				experience: data.experience,
				experienceTotal: data.experienceTotal,
				experienceToNextLevel: data.experienceToNextLevel,
				createdAt: new Date(data.createdAt),
			}))
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
		}
	},
}))
