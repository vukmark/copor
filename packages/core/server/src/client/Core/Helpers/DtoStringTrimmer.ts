export class DtoStringTrimmer {
	static trimStrings<T extends object | object[]>(dto: T): T {
		if (Array.isArray(dto)) {
			return dto.map((item) => this.trimStrings(item)) as T;
		}

		const result = {... dto};

		(Object.keys(result) as (keyof T)[]).forEach((key) => {
			const value = result[key];

			if (typeof value === 'string') {
				result[key] = value.trim() as T[typeof key];
			}
		});

		return result;
	}
}