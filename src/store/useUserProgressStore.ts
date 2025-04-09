import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export type IUserProgress = {
	id: number
	userId: number
	languageId: number
	lastUnlockedLevel: number
	createdAt: Date
	updatedAt: Date
}

export type IUserProgressData = {
	// TODO
	// userProgresses: Map<number, IUserProgress>
	userProgresses: IUserProgress[] | null
	lastSelectedLanguageId: number | null
}

type IUserProgressState = {
	userProgressData: IUserProgressData
	fetching: boolean
}

export type UserProgressActions = {
	setSelectedLanguageId: (languageId: number) => Promise<void>
	subscribeUserToLanuage: (languageId: number) => void
	fetchUserProgressData: () => Promise<void>
	reset: () => void
}

export type UserProgressStateStore = IUserProgressState & UserProgressActions

export const useUserProgressStore = create<UserProgressStateStore>(set => ({
	userProgressData: { lastSelectedLanguageId: null, userProgresses: null },
	fetching: false,

	setSelectedLanguageId: async (languageId: number) => {
		const {
			data: { lastLanguageId },
		} = await $api.post<{ lastLanguageId: number }>(`api/users/me/last-language/${languageId}`)

		set(prev => {
			prev.fetchUserProgressData()
			return {
				userProgressData: { ...prev.userProgressData, lastSelectedLanguageId: lastLanguageId },
			}
		})
	},

	subscribeUserToLanuage: async (languageId: number) => {
		try {
			const {
				data: { lanuageId: newLanguageId },
			} = await $api.post<{ lanuageId: number }>(`api/users/me/subscribe-language/${languageId}`)
			set(prev => {
				prev.fetchUserProgressData()
				return {
					userProgressData: {
						userProgresses: prev.userProgressData.userProgresses,
						lastSelectedLanguageId: newLanguageId,
					},
				}
			})
		} catch (error) {}
	},

	fetchUserProgressData: async () => {
		set(prev => ({ ...prev, fetching: true }))

		const { data: progressData } = await $api.get<IUserProgress[]>(`api/progress/me`)

		const { data: lastLanguageData } = await $api.get<{ lastLanguageCourseId: number | null }>(
			`api/users/me/last-language`,
		)

		set(() => ({
			userProgressData: {
				userProgresses: progressData.map(pro => ({
					...pro,
					updatedAt: new Date(pro.updatedAt),
					createdAt: new Date(pro.createdAt),
				})),
				lastSelectedLanguageId: lastLanguageData.lastLanguageCourseId,
			},
			fetching: false,
		}))
	},

	reset: () =>
		set(() => ({
			userProgressData: { lastSelectedLanguageId: null, userProgresses: null },
			fetching: false,
		})),
}))
