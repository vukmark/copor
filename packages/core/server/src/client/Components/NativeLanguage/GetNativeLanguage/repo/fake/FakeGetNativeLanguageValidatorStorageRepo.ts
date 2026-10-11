import {ValidateGetNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateGetNativeLanguageRepo';

export class FakeGetNativeLanguageValidatorStorageRepo implements ValidateGetNativeLanguageRepo {
	isInvalidNativeLanguage(languageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
