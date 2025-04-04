import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

import { AppNavigator } from './src/navigation/AppNavigator'
import { LoadingScreen } from './src/widgets/ui'
import { useProfileStore } from './src/store/useProfileStore'
import { AuthProvider, useAuth } from './src/navigation/AuthContext'
import { LoginScreen } from './src/features'

const Layout = () => {
	const { authState } = useAuth()
	const [firstRender, setFirstRender] = useState(true)
	const { fetching, fetchProfileData } = useProfileStore()

	useEffect(() => {
		console.log(authState)
		if (authState?.authenticated) fetchProfileData()
	}, [authState])

	if (typeof authState!.authenticated === 'undefined')
		return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />

	if (!authState!.authenticated) return <LoginScreen />

	if (firstRender && fetching) {
		setTimeout(() => setFirstRender(false), 500)
		return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />
	}
	return <AppNavigator />
}

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AuthProvider>
				<Layout />
			</AuthProvider>
		</SafeAreaView>
	)
}
