import { memo, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '../../../constants/theme'
import { ILanguage } from '..'

export interface ILanguageBlockProps {
	courseData: ILanguage
	onPress: (courseId: number) => void
	active?: boolean
}

const LanguageBlock = memo(({ courseData, onPress, active = false }: ILanguageBlockProps) => {
	const pressHandler = useCallback(() => {
		onPress(courseData.id)
	}, [onPress])

	return (
		<TouchableOpacity
			disabled={active}
			onPress={pressHandler}
			style={[styles.root, active ? styles.active : '']}>
			<Image
				style={styles.img}
				source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${courseData.flagIcon}` }}
			/>
			<Text style={styles.title}>{courseData.name}</Text>
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	root: {
		borderWidth: 2,
		borderRadius: 12,
		borderColor: 'transparent',
		width: 150,
		height: 120,
		padding: 10,
		gap: 8,
	},
	active: {
		borderColor: COLORS.tomato,
	},
	img: {
		flex: 1,
		resizeMode: 'center',
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '600',
	},
})

export { LanguageBlock }
