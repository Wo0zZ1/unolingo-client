import { memo, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ICourseData } from '../../../store/useProfileStore'
import { COLORS } from '../../../constants/theme'
import { SvgUri } from 'react-native-svg'

interface ICourseBlockData {
	courseData: ICourseData
	onPress: (courseId: number) => void
	active?: boolean
}

const CourseBlock = memo(({ courseData, onPress, active = false }: ICourseBlockData) => {
	const pressHandler = useCallback(() => {
		onPress(courseData.id)
	}, [])

	return (
		<TouchableOpacity
			disabled={active}
			onPress={pressHandler}
			style={[styles.root, active ? styles.active : '']}>
			{/* <SvgUri uri={courseData.languageData.img} style={styles.img} /> */}
			<Image style={styles.img} source={{ uri: courseData.languageData.img }} />
			<Text style={styles.title}>{courseData.languageData.name}</Text>
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	root: {
		borderWidth: 2,
		borderRadius: 12,
		borderColor: 'transparent',
		width: 140,
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

export { CourseBlock }
