import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { LevelMapScreen, ProfileScreen, StatsScreen } from '../features'
import { COLORS } from '../constants/theme'
import vibrate from '../utils/vibrate'

const Tab = createBottomTabNavigator()

const getIconName = (routeName: string, focused: boolean) => {
	switch (routeName) {
		case 'Карта':
			return focused ? 'map' : 'map-outline'
		case 'Статистика':
			return focused ? 'stats-chart' : 'stats-chart-outline'
		case 'Профиль':
			return focused ? 'person' : 'person-outline'
		default:
			return 'home'
	}
}

const tabListeners = {
	tabPress: () => vibrate('medium'),
}

const MainTabs = () => (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => (
				<Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
			),
			animation: 'fade',
			sceneStyle: { backgroundColor: COLORS.white },
			tabBarActiveTintColor: 'tomato',
			tabBarInactiveTintColor: 'gray',
		})}>
		<Tab.Screen listeners={tabListeners} name='Карта' component={LevelMapScreen} />
		<Tab.Screen listeners={tabListeners} name='Статистика' component={StatsScreen} />
		<Tab.Screen listeners={tabListeners} name='Профиль' component={ProfileScreen} />
	</Tab.Navigator>
)

export default MainTabs
