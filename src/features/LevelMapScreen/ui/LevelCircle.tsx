import * as Haptics from 'expo-haptics'
import { StyleSheet, View } from 'react-native'

import PressableButton from '../../../shared/ui/PressableButton'
import { ILevel } from '../model/levels'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/types'

type TPosition = 'left' | 'mid' | 'right'

interface ILevelCircleProps {
	level: ILevel
	position: TPosition
}

const LevelCircle = ({ level, position }: ILevelCircleProps) => {
	const navigation = useNavigation<NavigationProp>()

	const circlePressIn = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	const circlePress = () => {
		console.log(`Заупск  уровня с id: ${level.id}`)
		navigation.navigate('LevelPlay', { levelId: level.id })
	}

	const calcLeft = (position: TPosition) => {
		if (position === 'mid') return 'center'
		if (position === 'left') return 'flex-start'
		return 'flex-end'
	}

	return (
		<View style={{ alignSelf: calcLeft(position) }}>
			<PressableButton
				disabled={!level.isOpened}
				onPressIn={circlePressIn}
				onPress={circlePress}
				yOffset={6}
				borderRadius={'100%'}
				bgFront={'#ff6347'}
				bgBack={'#cc4f38'}>
				<View style={styles.circle} />
			</PressableButton>
		</View>
	)
}

const styles = StyleSheet.create({
	circle: {
		width: 80,
		height: 80,
	},
})

export default LevelCircle
