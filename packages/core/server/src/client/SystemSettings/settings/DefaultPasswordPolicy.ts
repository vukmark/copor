import {GetPasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetPasswordSystemSettingsDTO';

export const DEFAULT_PASSWORD_POLICY: GetPasswordSystemSettingsDTO = {
	minPasswordLength: 12,
	maxPasswordLength: 128,
	minLowercaseLetters: 1,
	minUppercaseLetters: 1,
	minDigits: 1,
	minSpecialCharacters: 1,
	allowSpaces: true,
	disallowUsernameInPassword: true,
	disallowEmailOrNameInPassword: true,
	blockCommonPasswords: true,
	maxRepeatedCharacters: 3,
	passwordHistoryCount: 5,
	commonPasswords: ['123456', 'password', 'admin']
};
