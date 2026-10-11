import {ValidateDeleteLanguageRepo}
	from '@copor/core/domain/Components/Language/repository/ValidateDeleteLanguageRepo';
import {LanguageKyselyHelper} from '@copor/core/client/Components/Language/repositoryHelper/LanguageKyselyHelper';

export class KyselyDeleteLanguageValidatorStorageRepo implements ValidateDeleteLanguageRepo {
	public async isInvalidLanguage(id: string): Promise<boolean> {
		return LanguageKyselyHelper.isInvalidLanguage(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return LanguageKyselyHelper.languageHasReferences(id);
	}
}
