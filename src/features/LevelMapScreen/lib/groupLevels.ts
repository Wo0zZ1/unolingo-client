import type { ILevel } from '../model/levels'

export const groupLevels = <T extends ILevel[]>(levels: T): T[] => {
	const sections: T[] = []
	for (let i = 0; i < levels.length; i += 5)
		sections.push(levels.slice(i, i + 5) as T)
	return sections
}
