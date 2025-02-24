import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'

import { LevelPlayScreen } from '../../features'
import MainTabs from './MainTabs'
import LevelStatsScreen from '../../features/LevelPlay/ui/LevelStatsScreen'

const Stack = createStackNavigator()

export const AppNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen
				name='MainTabs'
				component={MainTabs}
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name='LevelPlay'
				component={LevelPlayScreen}
				options={{ headerShown: false, gestureEnabled: false }}
			/>
			<Stack.Screen
				name='LevelStats'
				component={LevelStatsScreen}
				options={{
					headerShown: false,
					gestureEnabled: false,
					detachPreviousScreen: true,
					freezeOnBlur: true,
					// ...TransitionPresets.ModalSlideFromBottomIOS,
				}}
			/>
		</Stack.Navigator>
	</NavigationContainer>
)
