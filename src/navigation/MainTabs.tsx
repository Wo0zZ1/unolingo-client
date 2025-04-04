import React, { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { LevelMapScreen, ProfileScreen, StatsScreen } from '../features'
import { COLORS } from '../constants/theme'
import vibrate from '../utils/vibrate'

const Tab = createBottomTabNavigator()

const getIconName = (routeName: string, focused: boolean) => {
	switch (routeName) {
		case 'Map':
			return focused ? 'map' : 'map-outline'
		case 'Stats':
			return focused ? 'stats-chart' : 'stats-chart-outline'
		case 'Profile':
			return focused ? 'person' : 'person-outline'
		default:
			return 'home'
	}
}

const tabClickHandler = () => vibrate('medium')

const tabListeners = {
	tabPress: tabClickHandler,
}

const MainTabs = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => (
				<Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
			),
			sceneStyle: { backgroundColor: COLORS.white },
			tabBarActiveTintColor: 'tomato',
			tabBarInactiveTintColor: 'gray',
		})}>
		<Tab.Screen listeners={tabListeners} name='Map' component={LevelMapScreen} />
		<Tab.Screen listeners={tabListeners} name='Stats' component={StatsScreen} />
		<Tab.Screen listeners={tabListeners} name='Profile' component={ProfileScreen} />
	</Tab.Navigator>
)

export default MainTabs
