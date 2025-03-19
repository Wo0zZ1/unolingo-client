import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'

import { AppNavigator } from './src/navigation/AppNavigator'
import { LoadingScreen } from './src/widgets/ui'
import { useProfileStore } from './src/store/useProfileStore'

export default function App() {
	const [firstRender, setFirstRender] = useState<boolean>(true)
	const { fetching, fetchProfileData } = useProfileStore()

	useEffect(() => {
		fetchProfileData()
	}, [])

	if (firstRender && fetching) {
		setTimeout(() => setFirstRender(false), 100)
		return <LoadingScreen backBtn={false} title={'Загрузка приложения...'} />
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppNavigator />
		</SafeAreaView>
	)
}
