export interface GetPasswordSystemSettingsDTO {
	minPasswordLength: number;
	maxPasswordLength: number;
	minLowercaseLetters: number;
	minUppercaseLetters: number;
	minDigits: number;
	minSpecialCharacters: number;
	allowSpaces: boolean;
	disallowUsernameInPassword: boolean;
	disallowEmailOrNameInPassword: boolean;
	blockCommonPasswords: boolean;
	maxRepeatedCharacters: number;
	passwordHistoryCount: number;
	commonPasswords: string[];
}
