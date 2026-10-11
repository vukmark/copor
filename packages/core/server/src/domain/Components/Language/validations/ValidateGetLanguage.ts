import {ValidateGetLanguageDTO} from './dto/ValidateGetLanguageDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetLanguage} from './permissions/ValidateCanGetLanguage';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateLanguage';
import {ValidateGetLanguageRepo} from '@copor/core/domain/Components/Language/repository/ValidateGetLanguageRepo';

export class ValidateGetLanguage extends ValidationWithPermissionAndRepo<ValidateGetLanguageDTO, ValidateGetLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetLanguage(this.permissionRepo, this.input.actorId),
			new ValidateLanguage(this.storageRepo, this.input.languageId)
		];
	}
}