import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

import { AppNavigator } from './src/navigation/AppNavigator'
import { LoadingScreen } from './src/widgets/ui'

export default function App() {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 400)
	}, [])

	if (loading) return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppNavigator />
		</SafeAreaView>
	)
}
