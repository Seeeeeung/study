export const getDate = (date) => {
	const _date = new Date(date);
	const year = _date.getFullYear()
	const month = String(_date.getMonth() + 1).padStart(2,'0')
	const days = String(_date.getDate()).padStart(2,'0')
	return `${year}.${month}.${days}`
}