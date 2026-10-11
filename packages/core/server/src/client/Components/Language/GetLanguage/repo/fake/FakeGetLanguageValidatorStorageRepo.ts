import {ValidateGetLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateGetLanguageRepo';

export class FakeGetLanguageValidatorStorageRepo implements ValidateGetLanguageRepo {
	isInvalidLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
