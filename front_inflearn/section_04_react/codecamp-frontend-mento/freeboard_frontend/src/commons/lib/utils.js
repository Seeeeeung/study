export const getDate = (date) => {
	const _date = new Date(date);
	const year = _date.getFullYear()
	const month = _date.getMonth() + 1
	const days = _date.getDate()
	console.log(_date)
	return `${year}-${month}-${days}`
}