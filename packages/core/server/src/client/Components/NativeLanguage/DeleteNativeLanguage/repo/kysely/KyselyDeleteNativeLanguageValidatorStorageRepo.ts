import {ValidateDeleteNativeLanguageRepo}
	from '@copor/core/domain/Components/NativeLanguage/repository/ValidateDeleteNativeLanguageRepo';
import {NativeLanguageKyselyHelper} from '@copor/core/client/Components/NativeLanguage/repositoryHelper/NativeLanguageKyselyHelper';

export class KyselyDeleteNativeLanguageValidatorStorageRepo implements ValidateDeleteNativeLanguageRepo {
	public async isInvalidNativeLanguage(id: string): Promise<boolean> {
		return NativeLanguageKyselyHelper.isInvalidNativeLanguage(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return NativeLanguageKyselyHelper.nativeLanguageHasReferences(id);
	}
}
