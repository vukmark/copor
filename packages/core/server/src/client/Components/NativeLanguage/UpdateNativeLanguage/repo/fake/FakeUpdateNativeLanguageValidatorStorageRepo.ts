import {ValidateUpdateNativeLanguageRepo}
	from '@copor/core/domain/Components/NativeLanguage/repository/ValidateUpdateNativeLanguageRepo';

export class FakeUpdateNativeLanguageValidatorStorageRepo implements ValidateUpdateNativeLanguageRepo {
	isInvalidNativeLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
