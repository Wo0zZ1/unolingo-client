import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
	Login: undefined
	MainTabs: undefined
	LevelPlay: { levelId: number }
	LevelStats: undefined
	Theory: { theoryId: number }
}

export type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>
