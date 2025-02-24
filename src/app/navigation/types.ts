import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
	MainTabs: undefined
	LevelPlay: { levelId: number }
	LevelStats: undefined
}

export type NavigationProp = StackNavigationProp<
	RootStackParamList,
	'MainTabs'
>
