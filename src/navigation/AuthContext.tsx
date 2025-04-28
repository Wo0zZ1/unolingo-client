import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'

import { LanguageCode } from '../store/useUserStore'

interface IAuthState {
	token: string | null
	authenticated: boolean | undefined
}

interface AuthProps {
	onRegister?: (email: string, password: string, language: LanguageCode) => Promise<any>
	onLogin?: (email: string, password: string) => Promise<any>
	onLogout?: () => Promise<any>
	authState?: IAuthState
}

const TOKEN_KEY = 'jwt'
const AuthContext = createContext<AuthProps>({})

console.log(process.env.EXPO_PUBLIC_API_URL + '/')

export const $api = axios.create({
	withCredentials: true,
	baseURL: process.env.EXPO_PUBLIC_API_URL + '/',
})

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<IAuthState>({
		token: null,
		authenticated: undefined,
	})

	useEffect(() => {
		const interceprotId = $api.interceptors.response.use(
			config => {
				console.log(`URL: ${config.config.url}:`, config.data)
				return config
			},
			async error => {
				console.log(error)

				const originalRequest = error.config

				if (error.response.status === 401) {
					if (originalRequest && !originalRequest._isRetry)
						try {
							originalRequest._isRetry = true
							console.log(`URL: ${process.env.EXPO_PUBLIC_API_URL}/api/auth/refresh`)
							const response = await axios.post(
								`${process.env.EXPO_PUBLIC_API_URL}/api/auth/refresh`,
								{},
								{
									withCredentials: true,
								},
							)
							console.log(`Новый рефреш токен: ${response.data.accessToken}`)
							await AsyncStorage.setItem(TOKEN_KEY, response.data.accessToken)
							originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
							$api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
							return await $api.request(originalRequest)
						} catch (refreshError) {
							console.log('Ошибка обновления токена:', refreshError)
							return value.onLogout!()
						}
				}
				value.onLogout!()
				Promise.reject(error)
			},
		)

		const loadToken = async () => {
			const token = await AsyncStorage.getItem(TOKEN_KEY)

			if (token) {
				$api.defaults.headers.common.Authorization = `Bearer ${token}`
				await $api.post('api/auth/check')
				setAuthState({
					token: token,
					authenticated: true,
				})
			} else
				setAuthState({
					token: null,
					authenticated: false,
				})
		}
		loadToken()

		return () => {
			$api.interceptors.response.eject(interceprotId)
		}
	}, [])

	const register = async (login: string, password: string, language: LanguageCode) => {
		try {
			// TODO Переделать
			const { data } = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`, {
				username: login,
				password,
				language: 'RU',
			})

			value.onLogin!(login, password)
			return { error: false, msg: 'succeess' }
		} catch (error) {
			console.log('error:', error)
			if (error instanceof AxiosError) {
				if (error.status === 409)
					return { error: true, msg: 'Аккаунт с таким именем уже существует' }
			}
			return { error: true, msg: 'Произошла непредвиденная ошибка' }
		}
	}

	const login = async (login: string, password: string) => {
		try {
			console.log(`URL: ${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`)

			const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`, {
				username: login,
				password,
			})

			setAuthState({
				token: result.data.accessToken,
				authenticated: true,
			})

			$api.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`

			await AsyncStorage.setItem(TOKEN_KEY, result.data.accessToken)

			return result
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.status === 401) return { error: true, msg: 'Неправильный логин или пароль' }
			}
			console.log('ошибка:', error)
			return { error: true, msg: error as any }
		}
	}

	const logout = async () => {
		try {
			await AsyncStorage.removeItem(TOKEN_KEY)
			$api.defaults.headers.common.Authorization = ''
			setAuthState({
				token: null,
				authenticated: false,
			})
			console.log(`URL: ${process.env.EXPO_PUBLIC_API_URL}/api/auth/logout`)
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/api/auth/logout`,
				{},
				{
					withCredentials: true,
				},
			)
			console.log(`Результат выхода из аккаунта: ${response.data}`)
		} catch (error) {
			console.log('ошибка:', error)
			return { error: true, msg: (error as any).response.data.msg }
		}
	}

	const value: AuthProps = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
