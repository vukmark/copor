import {ValidateUpdateUserPreferencesRepo}
	from '@copor/core/domain/User/UserPreferences/repository/ValidateUpdateUserPreferencesRepo';

export class FakeUpdateUserPreferencesValidatorStorageRepo implements ValidateUpdateUserPreferencesRepo {
	isInvalidLanguage(languageId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
