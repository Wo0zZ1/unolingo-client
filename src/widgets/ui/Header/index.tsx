import { memo, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { QuitButton } from '../../../shared/ui'

interface IHeaderProps {
	children?: ReactNode
}

const Header = memo(({ children }: IHeaderProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<QuitButton style={styles.close} />
				{children}
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: '#fff',
	},
	header: {
		zIndex: 10,
		position: 'absolute',
		top: 0,
		left: 20,
		right: 20,
		height: 50,
		paddingHorizontal: 35,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	close: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
	},
})

export default Header
