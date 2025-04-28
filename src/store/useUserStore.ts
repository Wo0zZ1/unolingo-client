import { create } from 'zustand'

import { $api } from '../navigation/AuthContext'

export type LanguageCode = 'RU' | 'EN' | 'DE' | 'FR' | 'ES'

type IUserData = {
	id: number
	username: string
	language: LanguageCode
	createdAt: Date
	updatedAt: Date
}

type IUserState = {
	userData: IUserData | null
	fetching: boolean
}

export type UserActions = {
	fetchUserData: () => Promise<void>
	reset: () => void
}

export type UserStateStore = IUserState & UserActions

export const useUserStore = create<UserStateStore>(set => ({
	userData: null,
	fetching: false,

	fetchUserData: async () => {
		set(prev => ({ ...prev, fetching: true }))

		const { data } = await $api.get<IUserData>('api/users/me')

		set({
			fetching: false,
			userData: {
				...data,
				updatedAt: new Date(data.updatedAt),
				createdAt: new Date(data.createdAt),
			},
		})
	},

	reset: () =>
		set(() => ({
			userData: null,
			fetching: false,
		})),
}))
