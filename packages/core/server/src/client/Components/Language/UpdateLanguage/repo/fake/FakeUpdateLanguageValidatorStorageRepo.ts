import {ValidateUpdateLanguageRepo}
	from '@copor/core/domain/Components/Language/repository/ValidateUpdateLanguageRepo';

export class FakeUpdateLanguageValidatorStorageRepo implements ValidateUpdateLanguageRepo {
	isInvalidLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
