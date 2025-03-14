import { ReactNode } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import { COLORS } from '../constants/theme'

import { LevelPlayScreen, LevelStatsScreen, TheoryScreen } from '../features'

import MainTabs from './MainTabs'

const Stack = createStackNavigator()

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
	gestureEnabled: false,
	detachPreviousScreen: true,
	freezeOnBlur: true,
}

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <View style={{ flex: 1, backgroundColor: COLORS.white }}>{children}</View>
}

export const AppNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen
				layout={RootLayout}
				name='MainTabs'
				component={MainTabs}
				options={defaultOptions}
			/>
			<Stack.Screen
				layout={RootLayout}
				name='LevelPlay'
				component={LevelPlayScreen}
				options={defaultOptions}
			/>
			<Stack.Screen
				layout={RootLayout}
				name='LevelStats'
				component={LevelStatsScreen}
				options={defaultOptions}
			/>
			<Stack.Screen
				layout={RootLayout}
				name='Theory'
				component={TheoryScreen}
				options={defaultOptions}
			/>
		</Stack.Navigator>
	</NavigationContainer>
)
