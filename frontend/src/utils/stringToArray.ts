export default function NumberStringToArray(input: string) {
	return input
		.replace(/[^0-9, ]/g, '')
		.split(/[, ]+/)
		.map(number => number.trim())
		.filter(number => number !== '')
		.sort((a: any, b: any) => a - b)
}
