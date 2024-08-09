export const dataAttr = (flag: boolean | undefined, value?: string) => {
	if (!flag) {
		return null;
	}
	return value ?? '';
};

export const sumNumbers = (numbers: number[]) => 
	numbers.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
