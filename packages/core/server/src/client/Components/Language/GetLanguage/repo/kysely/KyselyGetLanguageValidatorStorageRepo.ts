import {LanguageKyselyHelper} from '@copor/core/client/Components/Language/repositoryHelper/LanguageKyselyHelper';
import {ValidateGetLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateGetLanguageRepo';

export class KyselyGetLanguageValidatorStorageRepo implements ValidateGetLanguageRepo {
	public async isInvalidLanguage(languageId: string): Promise<boolean> {
		return LanguageKyselyHelper.isInvalidLanguage(languageId);
	}
}
