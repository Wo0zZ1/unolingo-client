import { ReactNode } from 'react'
import { View } from 'react-native'

import { COLORS } from '../constants/theme'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <View style={{ flex: 1, backgroundColor: COLORS.white }}>{children}</View>
}

export { RootLayout }
