export const DateFormatter = (date) => {
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const year = date.getFullYear()
	const formatted_date = day + '-' + month + '-' + year
	return formatted_date
}

export const useFetch = (url, config) => {
	
}

