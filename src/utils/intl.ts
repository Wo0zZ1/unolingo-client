export const parseDate = (date: Date, lang: string = 'ru-RU') => {
	return Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(date)
}
