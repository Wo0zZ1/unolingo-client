import { memo, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { QuitButton } from '../../../shared/ui'

type IContent =
	| {
			title: string
			children?: undefined
	  }
	| {
			title?: undefined
			children: ReactNode
	  }
	| {
			title?: undefined
			children?: undefined
	  }

type IHeaderProps = IContent & {
	backBtn?: boolean
	underline?: boolean
}

const Header = memo(({ backBtn = true, underline = false, children, title }: IHeaderProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				{/* Кнопка назад */}
				{backBtn && <QuitButton style={styles.close} />}
				{/* Заголовок */}
				<Text style={styles.title}>{title}</Text>
				{/* Кастомный элемент */}
				{children}
			</View>
			{/* Подводка */}
			{underline && <View style={styles.underline} />}
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
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
	title: { fontSize: 24, fontWeight: 600, textTransform: 'uppercase' },
	underline: {
		position: 'absolute',
		height: 1,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#f2f2f2',
	},
})

export { Header }
