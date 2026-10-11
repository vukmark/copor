import {ValidateUpdateNativeLanguageRepo}
	from '@copor/core/domain/Components/NativeLanguage/repository/ValidateUpdateNativeLanguageRepo';
import {NativeLanguageKyselyHelper} from '@copor/core/client/Components/NativeLanguage/repositoryHelper/NativeLanguageKyselyHelper';

export class KyselyUpdateNativeLanguageValidatorStorageRepo implements ValidateUpdateNativeLanguageRepo {
	public async isInvalidNativeLanguage(languageId: string): Promise<boolean> {
		return NativeLanguageKyselyHelper.isInvalidNativeLanguage(languageId);
	}
}
