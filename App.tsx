import { useEffect } from 'react'
import { AppNavigator } from './src/app/navigation/AppNavigator'
import { useUserStore } from './src/app/store/useUserStore'
import { SafeAreaView, Text, View } from 'react-native'

export default function App() {
	const { fetchUserData, fetching } = useUserStore()

	useEffect(() => {
		fetchUserData()
	}, [fetchUserData])

	if (fetching) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Text style={{ fontSize: 30 }}>
					Идёт загрузка аккаунта...
				</Text>
			</View>
		)
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppNavigator />
		</SafeAreaView>
	)
}
