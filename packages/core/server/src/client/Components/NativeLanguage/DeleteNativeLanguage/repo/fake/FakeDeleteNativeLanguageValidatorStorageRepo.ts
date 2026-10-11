import {ValidateDeleteNativeLanguageRepo}
	from '@copor/core/domain/Components/NativeLanguage/repository/ValidateDeleteNativeLanguageRepo';

export class FakeDeleteNativeLanguageValidatorStorageRepo implements ValidateDeleteNativeLanguageRepo {
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidNativeLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}