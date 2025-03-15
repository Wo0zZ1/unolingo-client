import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import { LevelPlayScreen, LevelStatsScreen, TheoryScreen } from '../features'

import MainTabs from './MainTabs'
import { RootLayout } from './RootLayout'
import { COLORS } from '../constants/theme'

const Stack = createStackNavigator()

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
	gestureEnabled: false,
	detachPreviousScreen: true,
	freezeOnBlur: true,
	cardStyle: { backgroundColor: COLORS.white },
}

export const AppNavigator = () => (
	<NavigationContainer>
		<Stack.Navigator layout={RootLayout} screenOptions={defaultOptions}>
			<Stack.Screen name='MainTabs' component={MainTabs} />
			<Stack.Screen name='LevelPlay' component={LevelPlayScreen} />
			<Stack.Screen name='LevelStats' component={LevelStatsScreen} />
			<Stack.Screen name='Theory' component={TheoryScreen} />
		</Stack.Navigator>
	</NavigationContainer>
)
