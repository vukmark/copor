import {ValidateUpdateLanguageRepo}
	from '@copor/core/domain/Components/Language/repository/ValidateUpdateLanguageRepo';
import {LanguageKyselyHelper} from '@copor/core/client/Components/Language/repositoryHelper/LanguageKyselyHelper';

export class KyselyUpdateLanguageValidatorStorageRepo implements ValidateUpdateLanguageRepo {
	public async isInvalidLanguage(languageId: string): Promise<boolean> {
		return LanguageKyselyHelper.isInvalidLanguage(languageId);
	}
}
