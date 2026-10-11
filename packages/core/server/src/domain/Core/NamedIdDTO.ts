/**
 * @deprecated 0.0.90 instead use NameAndIdDTO<string>
 * @see NameAndIdDTO
 */
export interface NamedIdDTO {
	id: string;
	name: string;
}

export interface NameAndIdDTO<T = string> {
	id: T;
	name: string;
}

export class NameAndIdDToHelper {
	public static emptyString() : NameAndIdDTO {
		return {
			id: '',
			name: ''
		};
	}
}