import { StyleSheet, View } from 'react-native'

import { PressableButton } from '../../../shared/ui'
import vibrate from '../../../utils/vibrate'

type TPosition = 'left' | 'mid' | 'right'

interface ILevelCircleProps {
	opened: boolean
	position: TPosition
	onPress: () => void
}

const LevelCircle = ({ opened, position, onPress }: ILevelCircleProps) => {
	const calcLeft = (position: TPosition) => {
		if (position === 'mid') return 'center'
		if (position === 'left') return 'flex-start'
		return 'flex-end'
	}

	return (
		<View style={{ alignSelf: calcLeft(position) }}>
			<PressableButton
				disabled={!opened}
				onPressIn={vibrate}
				onPress={onPress}
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
