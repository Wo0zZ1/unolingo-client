import { useEffect, useState } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useLeaderboardStore } from '../../store/useLeaderBoardStore'

import { useAuth } from '../../navigation/AuthContext'
import { COLORS } from '../../constants/theme'
import { useLevelStatsStore } from '../../store/useLevelStatsStore'
import { useMapStore } from '../../store/useMapStore'
import { useTasksStore } from '../../store/useTasksStore'
import { useTheoryStore } from '../../store/useTheoryStore'
import { useUserProgressStore } from '../../store/useUserProgressStore'
import { useUserStatStore } from '../../store/useUserStatStore'
import { LanguageCode, useUserStore } from '../../store/useUserStore'
import { PressableButton } from '../../shared/ui'

interface ILoginForm {
	username: string
	password: string
	country?: LanguageCode
}

const LoginScreen = () => {
	const { onLogin, onRegister } = useAuth()

	const { reset: levelStatsReset } = useLevelStatsStore()
	const { reset: mapReset } = useMapStore()
	const { reset: tasksReset } = useTasksStore()
	const { reset: theoryReset } = useTheoryStore()
	const { reset: userProgressReset } = useUserProgressStore()
	const { reset: userStatReset } = useUserStatStore()
	const { reset: userReset } = useUserStore()
	const { reset: leaderboardReset } = useLeaderboardStore()

	useEffect(() => {
		return () => {
			levelStatsReset()
			mapReset()
			tasksReset()
			theoryReset()
			userProgressReset()
			userStatReset()
			userReset()
			leaderboardReset()
		}
	}, [])

	const [form, setForm] = useState<ILoginForm>({
		username: '',
		password: '',
		country: 'RU',
	})

	const logIn = async () => {
		if (!form.username) return alert('Поле имени пользователя не должно быть пустым')
		if (!form.password) return alert('Поле пароля не должно быть пустым')
		const result = await onLogin!(form.username, form.password)

		if (result?.error) alert(result.msg)
	}

	const register = async () => {
		// TODO IMPLEMENT
		if (!form.username) return alert('Поле имени пользователя не должно быть пустым')
		if (!form.password) return alert('Поле пароля не должно быть пустым')
		const result = await onRegister!(form.username, form.password, 'RU')
		if (result?.error) alert(result.msg)
		else logIn()
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.root}>
				<View style={styles.header}>
					<View style={styles.headerIcon}>
						<Ionicons size={44} color={COLORS.tomato} name='lock-closed'></Ionicons>
					</View>
					<Text style={styles.title}>
						Добро пожаловать в <Text style={{ color: COLORS.tomato }}>Unolingo!</Text>
					</Text>
					<Text style={styles.subtitle}>Давай изучать языки вместе</Text>
				</View>
				<KeyboardAvoidingView
					style={{ width: '100%', marginTop: 24 }}
					behavior={'padding'}
					keyboardVerticalOffset={40}>
					<View style={styles.form}>
						{/* LOGIN */}
						<View style={styles.input}>
							<Text style={styles.inputLabel}>Имя</Text>
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								value={form.username}
								onChangeText={username => setForm(prev => ({ ...prev, username }))}
								style={styles.inputControl}
							/>
						</View>
						{/* PASSWORD */}
						<View style={styles.input}>
							<Text style={styles.inputLabel}>Пароль</Text>
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								value={form.password}
								onChangeText={password => setForm(prev => ({ ...prev, password }))}
								style={styles.inputControl}
							/>
						</View>
						<View style={styles.formAction}>
							<View style={{ alignSelf: 'center', width: '65%' }}>
								<PressableButton style={styles.btn} withVibrate onPress={logIn}>
									<Text style={styles.btnText}>Войти</Text>
								</PressableButton>
							</View>
							<View style={{ alignSelf: 'center', width: '65%', marginTop: 16 }}>
								<PressableButton style={styles.btn} withVibrate onPress={register}>
									<Text style={styles.btnText}>Зарегистрироваться</Text>
								</PressableButton>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		padding: 24,
	},
	header: {
		marginVertical: 36,
	},
	headerIcon: {
		width: 80,
		height: 80,
		marginBottom: 36,
		backgroundColor: COLORS.white,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: 700,
		color: '#1d1d1d',
		marginBottom: 6,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 15,
		fontWeight: 500,
		color: '#929292',
		textAlign: 'center',
	},
	form: {
		marginBottom: 24,
	},
	input: {
		marginBottom: 16,
	},
	inputLabel: {
		position: 'absolute',
		inset: 0,
		zIndex: 9,
		width: 60,
		lineHeight: 44,
		marginHorizontal: 12,
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 13,
		color: '#c0c0c0',
		fontWeight: 500,
	},
	inputControl: {
		height: 44,
		backgroundColor: COLORS.white,
		paddingLeft: 80,
		paddingRight: 24,
		borderRadius: 12,
		fontSize: 15,
		color: '#222222',
		fontWeight: 500,
	},
	formAction: {
		marginVertical: 24,
		alignItems: 'stretch',
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	btnText: {
		fontSize: 18,
		lineHeight: 26,
		fontWeight: 600,
		color: COLORS.white,
	},
})

export { LoginScreen }
