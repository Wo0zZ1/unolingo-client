import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, TextInput, View } from 'react-native'

import { useLeaderboardStore } from '../../store/useLeaderBoardStore'

import { useAuth } from '../../navigation/AuthContext'
import { COLORS } from '../../constants/theme'
import { useLevelStatsStore } from '../../store/useLevelStatsStore'
import { useMapStore } from '../../store/useMapStore'
import { useTasksStore } from '../../store/useTasksStore'
import { useTheoryStore } from '../../store/useTheoryStore'
import { useUserProgressStore } from '../../store/useUserProgressStore'
import { useUserStatStore } from '../../store/useUserStatStore'
import { useUserStore } from '../../store/useUserStore'

const LoginScreen = () => {
	const [login, setLogin] = useState<string>('John')
	const [password, setPassword] = useState<string>('Doe')
	const { onLogin, onRegister } = useAuth()

	const { reset: levelStatsReset } = useLevelStatsStore()
	const { reset: mapRest } = useMapStore()
	const { reset: tasksRest } = useTasksStore()
	const { reset: theoryRest } = useTheoryStore()
	const { reset: userProgressRest } = useUserProgressStore()
	const { reset: userStatRest } = useUserStatStore()
	const { reset: userRest } = useUserStore()
	const { reset: leaderboardRest } = useLeaderboardStore()

	const logIn = async () => {
		const result = await onLogin!(login, password)

		if (result?.error) alert(result.msg)
	}

	const register = async () => {
		// TODO IMPLEMENT
		const result = await onRegister!(login, password, 'RU')
		if (result?.error) alert(result.msg)
		else logIn()
	}

	useEffect(() => {
		return () => {
			levelStatsReset()
			mapRest()
			tasksRest()
			theoryRest()
			userProgressRest()
			userStatRest()
			userRest()
			leaderboardRest()
		}
	}, [])

	return (
		<View style={styles.root}>
			<Image source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }} style={styles.img} />
			<View style={styles.form}>
				<TextInput style={styles.input} placeholder='Login' onChangeText={setLogin} value={login} />
				<TextInput
					style={styles.input}
					placeholder='Password'
					onChangeText={setPassword}
					value={password}
				/>
				<Button onPress={logIn} title='Sign in' />
				<Button onPress={register} title='Create account' />
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	root: { alignItems: 'center', flex: 1 },
	img: { width: '50%', height: '50%', resizeMode: 'contain' },
	form: { gap: 10, width: '60%' },
	input: {
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: COLORS.tomato,
	},
})

export { LoginScreen }
