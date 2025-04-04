import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface IAuthState {
	token: string | null
	authenticated: boolean | undefined
}

interface AuthProps {
	onRegister?: (email: string, password: string) => Promise<any>
	onLogin?: (email: string, password: string) => Promise<any>
	onLogout?: () => Promise<any>
	authState?: IAuthState
}

export const API_URL = 'http://192.168.0.115:3000/api/'
const TOKEN_KEY = 'jwt'
const AuthContext = createContext<AuthProps>({})

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
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
				// TODO DEBUG
				console.log(config.data)
				return config
			},
			async error => {
				// TODO DEBUG
				console.log(error)
				if (error.response.status === 401 && error.config) value.onLogout!()
				throw error
			},
		)

		const loadToken = async () => {
			const token = await AsyncStorage.getItem(TOKEN_KEY)
			console.log('stored:', token)

			if (token) {
				$api.defaults.headers.common.Authorization = `Bearer ${token}`

				await $api.post('auth/check')

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

	const register = async (login: string, password: string) => {
		try {
			return await $api.post(`auth/register`, { username: login, password })
		} catch (error) {
			return { error: true, msg: (error as any).response.data.msg }
		}
	}

	const login = async (login: string, password: string) => {
		try {
			const result = await $api.post(`auth/login`, {
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
			console.log('error:', error)
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
		} catch (error) {
			console.log('error:', error)
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
