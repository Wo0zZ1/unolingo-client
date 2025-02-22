import * as Haptics from 'expo-haptics'
import {
	Dimensions,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

const { width } = Dimensions.get('window')

const levels = [
	{ id: 1, title: 'Level 1', x: width * 0.2, y: 50 },
	{ id: 2, title: 'Level 2', x: width * 0.8, y: 150 },
	{ id: 3, title: 'Level 3', x: width * 0.2, y: 250 },
	{ id: 4, title: 'Level 4', x: width * 0.8, y: 350 },
	{ id: 5, title: 'Level 5', x: width * 0.2, y: 450 },
]

const LevelMap = () => {
	const handleLevelPress = (levelId: number) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		console.log(`Level ${levelId} pressed`)
	}

	const generatePath = () => {
		let path = `M ${levels[0].x} ${levels[0].y}`
		for (let i = 1; i < levels.length; i++) {
			const { x, y } = levels[i]
			path += ` Q ${x} ${levels[i - 1].y}, ${x} ${y}`
		}
		return path
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Svg height='100%' width='100%' style={styles.svg}>
				<Path
					d={generatePath()}
					fill='none'
					stroke='tomato'
					strokeWidth={4}
				/>
			</Svg>
			{levels.map(level => (
				<TouchableOpacity
					key={level.id}
					style={[
						styles.levelCard,
						{ left: level.x - 50, top: level.y - 50 },
					]}
					onPressIn={() => handleLevelPress(level.id)}
					onPressOut={() => handleLevelPress(level.id)}>
					<Text style={styles.levelText}>{level.title}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: '100%',
	},
	svg: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	levelCard: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
		borderRadius: '100%',
		width: 100,
		height: 100,
		padding: 20,
	},
	levelText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
})

export default LevelMap
