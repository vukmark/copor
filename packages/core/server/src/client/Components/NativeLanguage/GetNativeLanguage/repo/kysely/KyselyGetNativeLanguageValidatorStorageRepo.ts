import {NativeLanguageKyselyHelper} from '@copor/core/client/Components/NativeLanguage/repositoryHelper/NativeLanguageKyselyHelper';
import {ValidateGetNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateGetNativeLanguageRepo';

export class KyselyGetNativeLanguageValidatorStorageRepo implements ValidateGetNativeLanguageRepo {
	public async isInvalidNativeLanguage(languageId: string): Promise<boolean> {
		return NativeLanguageKyselyHelper.isInvalidNativeLanguage(languageId);
	}
}
