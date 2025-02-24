const generateSectionPath = (
	sectionsHeight: number,
	width: number,
) => {
	let path = ''

	const height = sectionsHeight - 5 * 80 - 41
	width *= 0.7

	path += `l ${0} ${41}`
	path += `l ${0} ${height / 5 + 40}`
	path += `l ${width / 2 - 40} ${height / 5 + 80}`
	path += `l ${-width / 2 + 40} ${height / 5 + 80}`
	path += `l ${-width / 2 + 40} ${height / 5 + 80}`
	path += `l ${width / 2 - 40} ${height / 5 + 80}`
	path += `l ${0} ${61}`

	return path
}

export const generatePath = (
	sectionHeight: number,
	sectionsCount: number,
	width: number,
) => {
	let path = ''
	const sectionPath = generateSectionPath(sectionHeight, width)

	path += `M ${width / 2} ${0}`
	for (let i = 0; i < sectionsCount; i++) path += sectionPath

	return path
}
