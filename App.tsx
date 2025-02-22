import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LevelMap from './src/features/levelMap/LevelMap'

const Tab = createBottomTabNavigator()

const styles = StyleSheet.create({
	centeredContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const StatsScreen = () => (
	<View style={styles.centeredContainer}>
		<Text>Stats Screen</Text>
	</View>
)

const AccountScreen = () => (
	<View style={styles.centeredContainer}>
		<Text>Account Screen</Text>
	</View>
)

const getIconName = (routeName: string, focused: boolean) => {
	switch (routeName) {
		case 'Home':
			return focused ? 'home' : 'home-outline'
		case 'Stats':
			return focused ? 'stats-chart' : 'stats-chart-outline'
		case 'Account':
			return focused ? 'person' : 'person-outline'
		default:
			return 'home'
	}
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={getIconName(route.name, focused)}
							size={size}
							color={color}
						/>
					),
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}>
				<Tab.Screen name='Home' component={LevelMap} />
				<Tab.Screen name='Stats' component={StatsScreen} />
				<Tab.Screen name='Account' component={AccountScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}
