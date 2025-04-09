import { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'

import { AppNavigator } from './src/navigation/AppNavigator'
import { LoadingScreen } from './src/widgets/ui'
import { AuthProvider, useAuth } from './src/navigation/AuthContext'
import { LoginScreen } from './src/features'
import { useUserStore } from './src/store/useUserStore'

const Layout = () => {
	const { authState } = useAuth()
	const [firstRender, setFirstRender] = useState(true)
	const { fetching, fetchUserData } = useUserStore()

	useEffect(() => {
		if (authState?.authenticated) fetchUserData()
	}, [authState])

	if (typeof authState!.authenticated === 'undefined')
		return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />

	if (!authState!.authenticated)
		return (
			<View style={{ flex: 1, backgroundColor: authState?.authenticated ? '#fff' : '#e8ecf4' }}>
				<SafeAreaView style={{ flex: 1 }}>
					<LoginScreen />
				</SafeAreaView>
			</View>
		)

	if (firstRender && fetching) {
		setTimeout(() => setFirstRender(false), 500)
		return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />
	}

	return (
		<View style={{ flex: 1, backgroundColor: authState?.authenticated ? '#fff' : '#e8ecf4' }}>
			<SafeAreaView style={{ flex: 1 }}>
				<AppNavigator />
			</SafeAreaView>
		</View>
	)
}

export default function App() {
	return (
		<AuthProvider>
			<Layout />
		</AuthProvider>
	)
}
