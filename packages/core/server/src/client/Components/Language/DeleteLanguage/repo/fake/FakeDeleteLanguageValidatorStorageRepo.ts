import {ValidateDeleteLanguageRepo}
	from '@copor/core/domain/Components/Language/repository/ValidateDeleteLanguageRepo';

export class FakeDeleteLanguageValidatorStorageRepo implements ValidateDeleteLanguageRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}