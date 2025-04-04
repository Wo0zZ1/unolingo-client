import { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, TextInput, View } from 'react-native'

import { $api, API_URL, useAuth } from '../../navigation/AuthContext'
import { COLORS } from '../../constants/theme'

const LoginScreen = () => {
	const [login, setLogin] = useState<string>('John')
	const [password, setPassword] = useState<string>('Doe')
	const { onLogin, onRegister } = useAuth()

	const logIn = async () => {
		const result = await onLogin!(login, password)

		if (result?.error) alert(result.msg)
	}

	const register = async () => {
		const result = await onRegister!(login, password)
		if (result?.error) alert(result.msg)
		else logIn()
	}

	useEffect(() => {
		const testCall = async () => {
			const result = await $api.get(`users`)
			console.log(result)
		}
		testCall()
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
