import {db} from '../../AppDataSource';

export class NewUsernameHelper {
	public static async create(userName: string | undefined, firstName: string, lastName: string): Promise<string> {
		const baseFName = this.normalizeToAscii(firstName);
		const baseLName = this.normalizeToAscii(lastName);
		const baseUserName: string = userName
			? userName.toLowerCase()
			: `${baseFName}.${baseLName}`;

		let newUserName = baseUserName;
		let suffix = 1;

		while (
			await db
				.selectFrom('authUser')
				.select('userName')
				.where('userName', '=', newUserName)
				.executeTakeFirst()
		) {
			newUserName = `${baseUserName}${suffix}`;
			suffix++;
		}

		return newUserName;
	}

	public static async update(id: string, firstName: string, lastName: string): Promise<string> {
		const baseFName = this.normalizeToAscii(firstName);
		const baseLName = this.normalizeToAscii(lastName);
		const baseUserName: string = `${baseFName}.${baseLName}`;
		let newUserName = baseUserName;
		let suffix = 1;

		while (
			await db
				.selectFrom('authUser')
				.select('userName')
				.where('userName', '=', newUserName)
				.where('id', '!=', id) // exclude current user by ID
				.executeTakeFirst()
		) {
			newUserName = `${baseUserName}${suffix}`;
			suffix++;
		}

		return newUserName;
	}

	public static normalizeToAscii(str: string): string {
		const charMap: Record<string, string> = {
			// German
			'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 'ss',
			// Other common European accents
			'č': 'c', 'ć': 'c', 'š': 's', 'ž': 'z', 'đ': 'dj',
			'Č': 'C', 'Ć': 'C', 'Š': 'S', 'Ž': 'Z', 'Đ': 'Dj',
			'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'å': 'a', 'ā': 'a',
			'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'ē': 'e',
			'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', 'ī': 'i',
			'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ø': 'o', 'ō': 'o',
			'ú': 'u', 'ù': 'u', 'û': 'u', 'ū': 'u',
			'ñ': 'n', 'ý': 'y', 'ÿ': 'y'
		};

		return str
			.trim()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.split('')
			.map((char) => charMap[char] || char)
			.join('')
			.toLowerCase()
			.replace(/\s+/g, '.');
	}
}