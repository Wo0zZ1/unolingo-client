import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
	Login: undefined
	MainTabs: undefined
	LevelPlay: { levelId: number; levelGlobalOrder: number }
	LevelStats: { levelId: number; levelGlobalOrder: number; tasksLength: number }
	Theory: { theoryId: number }
}

export type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>
