import { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { AppNavigator } from './src/navigation/AppNavigator'
import { useUserStore } from './src/store/useUserStore'
import LoadingScreen from './src/features/LoadingScreen'

export default function App() {
	const { fetchUserData, fetching } = useUserStore()

	useEffect(() => {
		fetchUserData()
	}, [fetchUserData])

	if (fetching) {
		return <LoadingScreen backBtn={false} title={'Загрузка приложения'} />
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppNavigator />
		</SafeAreaView>
	)
}
