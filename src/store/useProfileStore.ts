import { create } from 'zustand'
import sleep from '../utils/sleep'
import { IMapData } from './useMapStore'

export type ILanguageName = 'English' | 'Deutsch' | 'French'

export type ILanguageData = { name: ILanguageName; img: string }

export type ICourseData = {
	mapId: IMapData['id']
	languageData: ILanguageData
}

export type IProfileData = {
	id: number
	userName: string
	email: string

	activeCourseId: ICourseData['mapId']
	courses: ICourseData[]

	createdAt: Date

	level: number
	experience: number
	experienceTotal: number
	experienceToNextLevel: number
}

type IProfileStatePending = {
	profileData: IProfileData | null
	fetching: true
}

type IProfileStateFullfield = {
	profileData: IProfileData
	fetching: false
}

export type ProfileActions = {
	setActiveCourseId: (courseId: number) => void
	setLevel: (level: number) => void
	addExperience: (experience: number) => void
	setExperience: (experience: number) => void
	setExperienceTotal: (experienceTotal: number) => void
	setExperienceToNextLevel: (experienceToNextLevel: number) => void
	setCreatedAt: (createdAt: Date) => void

	fetchProfileData: () => Promise<void>
}

export type ProfileStateStore = (IProfileStatePending | IProfileStateFullfield) & ProfileActions

// TODO 10 уровней
export const experienceToNextLevelMock = [100, 200, 300, 400, 500, 600, 700, 800]

export const useProfileStore = create<ProfileStateStore>(set => ({
	profileData: null,
	fetching: true,

	// Методы для обновления состояния
	addExperience: experience => {
		set(prev => {
			if (prev.fetching) return {}

			let newLevel = prev.profileData.level
			let newExperience = prev.profileData.experience + experience
			const newExperienceTotal = prev.profileData.experienceTotal + experience
			let newExperienceToNextLevel = prev.profileData.experienceToNextLevel

			if (experience < newExperienceToNextLevel) newExperienceToNextLevel -= experience
			else {
				while (newExperience >= experienceToNextLevelMock[newLevel - 1]) {
					console.log('LEVEL UP')
					newExperience -= experienceToNextLevelMock[newLevel - 1]

					newLevel += 1

					newExperienceToNextLevel = experienceToNextLevelMock[newLevel - 1]
				}
				newExperienceToNextLevel -= newExperience
			}

			return {
				...prev,
				profileData: {
					level: newLevel,
					experience: newExperience,
					experienceTotal: newExperienceTotal,
					experienceToNextLevel: newExperienceToNextLevel,
				},
			}
		})
	},

	setActiveCourseId: courseId =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, activeCourseId: courseId } }
		}),
	setLevel: level =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, level } }
		}),
	setExperience: experience =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, experience } }
		}),
	setExperienceTotal: experienceTotal =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, experienceTotal } }
		}),
	setExperienceToNextLevel: experienceToNextLevel =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, experienceToNextLevel } }
		}),
	setCreatedAt: createdAt =>
		set(prev => {
			if (prev.fetching) return {}
			return { ...prev, profileData: { ...prev.profileData, createdAt } }
		}),

	// Метод для загрузки данных с сервера
	fetchProfileData: async () => {
		try {
			set(prev => ({ ...prev, fetching: true }))

			// TODO Подключить сервер
			// const response = await fetch('https://api.example.com/user')
			// const data = await response.json()

			// Mock data
			console.log(`Типа идет фетчинг профиля с id ${'TODO'}`)

			await sleep(1000)

			const data: IProfileData = {
				id: 0,
				userName: 'Wo0zZ1',
				email: 'Mper06@mail.ru',
				activeCourseId: 0,
				courses: [
					{
						mapId: 0,
						languageData: {
							name: 'English',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/375px-Flag_of_the_United_States.svg.png',
						},
					},
					{
						mapId: 1,
						languageData: {
							name: 'Deutsch',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png',
						},
					},
				],
				level: 1,
				experience: 0,
				experienceTotal: 0,
				experienceToNextLevel: 100,
				createdAt: new Date(2024, 4, 27),
			}
			// TODO Подключить сервер

			set(() => ({
				fetching: false,
				profileData: {
					id: data.id,
					userName: data.userName,
					email: data.email,
					activeCourseId: data.activeCourseId,
					courses: data.courses,
					level: data.level,
					experience: data.experience,
					experienceTotal: data.experienceTotal,
					experienceToNextLevel: data.experienceToNextLevel,
					createdAt: new Date(data.createdAt),
				},
			}))
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
		}
	},
}))
