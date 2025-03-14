import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { LevelMapScreen, ProfileScreen, StatsScreen } from '../features'

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

const MainTabs = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => (
				<Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
			),
			tabBarActiveTintColor: 'tomato',
			tabBarInactiveTintColor: 'gray',
		})}>
		<Tab.Screen name='Map' component={LevelMapScreen} />
		<Tab.Screen name='Stats' component={StatsScreen} />
		<Tab.Screen name='Profile' component={ProfileScreen} />
	</Tab.Navigator>
)

export default MainTabs
