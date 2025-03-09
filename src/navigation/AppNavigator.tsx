import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import MainTabs from './MainTabs'
import { LevelPlayScreen, LevelStatsScreen, TheoryScreen } from '../features'

const Stack = createStackNavigator()

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
	gestureEnabled: false,
	detachPreviousScreen: true,
	freezeOnBlur: true,
}

export const AppNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name='MainTabs' component={MainTabs} options={defaultOptions} />
			<Stack.Screen name='LevelPlay' component={LevelPlayScreen} options={defaultOptions} />
			<Stack.Screen name='LevelStats' component={LevelStatsScreen} options={defaultOptions} />
			<Stack.Screen name='Theory' component={TheoryScreen} options={defaultOptions} />
		</Stack.Navigator>
	</NavigationContainer>
)
