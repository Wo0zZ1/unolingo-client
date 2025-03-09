import * as Haptics from 'expo-haptics'

type VibrateType = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'

function vibrate(type?: VibrateType) {
	let vibrateType: Haptics.ImpactFeedbackStyle
	if (type === 'light')
		vibrateType = Haptics.ImpactFeedbackStyle.Light
	else if (type === 'medium')
		vibrateType = Haptics.ImpactFeedbackStyle.Medium
	else if (type === 'heavy')
		vibrateType = Haptics.ImpactFeedbackStyle.Heavy
	else if (type === 'rigid')
		vibrateType = Haptics.ImpactFeedbackStyle.Rigid
	else if (type === 'soft')
		vibrateType = Haptics.ImpactFeedbackStyle.Soft
	else vibrateType = Haptics.ImpactFeedbackStyle.Light

	Haptics.impactAsync(vibrateType)
}

export default vibrate
