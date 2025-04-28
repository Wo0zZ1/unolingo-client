import { StyleSheet, View } from 'react-native'

import LevelCircle from './LevelCircle'
import SectionDivider from './SectionDivider'

import { useDimensions } from '../../../hooks'
import { useEffect, useState } from 'react'
import { $api } from '../../../navigation/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/types'

// TODO Вынести логику
export interface ILevel {
	id: number
	order: number
}

interface ILevelsSectionsProps {
	height: number
	id: number
	order: number
	lastUnlockedLevel: number
}

const LevelsSection = ({ height, id, order, lastUnlockedLevel }: ILevelsSectionsProps) => {
	const navigation = useNavigation<NavigationProp>()
	const { width } = useDimensions()

	const [levels, setLevels] = useState<ILevel[] | null>()

	useEffect(() => {
		const fetchLevels = async () => {
			const { data } = await $api.get<ILevel[]>(`api/levels/section/${id}`)
			setLevels(data)
		}
		fetchLevels()
	}, [])

	if (!levels) return

	const pressHandler = (index: number) => {
		navigation.navigate('LevelPlay', {
			levelId: levels[index].id,
			levelGlobalOrder: (order - 1) * 5 + levels[index].order,
		})
	}

	const calcLeft = (index: number) => {
		if (index % 2 == 0) return 'mid'
		if (index % 4 == 1) return 'right'
		return 'left'
	}

	return (
		<View style={[styles.section, { height, width: width * 0.7 }]}>
			<SectionDivider width={width * 0.8} sectionName={`Глава ${order}`} />
			{levels.map((level, i) => (
				<LevelCircle
					position={calcLeft(i)}
					key={level.id}
					onPress={() => pressHandler(i)}
					opened={(order - 1) * 5 + level.order <= lastUnlockedLevel}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		marginHorizontal: 'auto',
	},
})

export default LevelsSection
