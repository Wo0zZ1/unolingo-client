import { memo, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { COLORS } from '../../../constants/theme'
import { ILanguageBlockProps } from './CourseBlock'
import { PressableButton } from '../../../shared/ui'

const NewLanguageBlock = memo(({ courseData, onPress }: ILanguageBlockProps) => {
	const pressHandler = useCallback(() => {
		onPress(courseData.id)
	}, [])

	return (
		<View>
			<View style={styles.root}>
				<Image
					style={styles.img}
					source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${courseData.flagIcon}` }}
				/>
				<Text style={styles.title}>{courseData.name}</Text>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<PressableButton
					withVibrate
					bgBack={COLORS.tomatoDark}
					bgFront={COLORS.tomato}
					onPress={pressHandler}
					style={styles.joinButton}>
					<Text style={styles.joinText}>Записаться</Text>
				</PressableButton>
			</View>
		</View>
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
	joinButton: {
		alignSelf: 'center',
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	joinText: {
		fontSize: 18,
		fontWeight: 700,
		textAlign: 'center',
		color: COLORS.white,
	},
})

export { NewLanguageBlock }
