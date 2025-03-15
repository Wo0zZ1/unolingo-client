module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ['./'],
					alias: {
						'@assets': './assets',
						'@hoocs': 'src/hoocs',
						'@constants': 'src/constants',
						'@features': 'src/features',
						'@navigation': 'src/navigation',
						'@shared': 'src/shared',
						'@store': 'src/store',
						'@utils': 'src/utils',
						'@widgets': 'src/widgets',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	}
}
