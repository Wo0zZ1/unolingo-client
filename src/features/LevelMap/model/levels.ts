export interface ILevel {
	id: number
	isOpened: boolean
	isCompleted: boolean
	section: number
}

export const mockLevels: ILevel[] = [
	{ id: 1 , isOpened: true , isCompleted: true , section: 1 },
	{ id: 2 , isOpened: true , isCompleted: true , section: 1 },
	{ id: 3 , isOpened: true , isCompleted: true , section: 1 },
	{ id: 4 , isOpened: true , isCompleted: true , section: 1 },
	{ id: 5 , isOpened: true , isCompleted: true , section: 1 },
	{ id: 6 , isOpened: true , isCompleted: true , section: 2 },
	{ id: 7 , isOpened: true , isCompleted: true , section: 2 },
	{ id: 8 , isOpened: true , isCompleted: true , section: 2 },
	{ id: 9 , isOpened: true , isCompleted: false, section: 2 },
	{ id: 11, isOpened: false, isCompleted: false, section: 2 },
	{ id: 10, isOpened: false, isCompleted: false, section: 3 },
	{ id: 12, isOpened: false, isCompleted: false, section: 3 },
	{ id: 13, isOpened: false, isCompleted: false, section: 3 },
	{ id: 14, isOpened: false, isCompleted: false, section: 3 },
	{ id: 15, isOpened: false, isCompleted: false, section: 3 },
]
