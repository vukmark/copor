import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateLanguage';
import {ValidateCanDeleteLanguage} from './permissions/ValidateCanDeleteLanguage';
import {ValidateDeleteLanguageRepo} from '../repository/ValidateDeleteLanguageRepo';
import {ValidateDeleteLanguageDTO} from './dto/ValidateDeleteLanguageDTO';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteLanguage extends ValidationWithPermissionAndRepo<ValidateDeleteLanguageDTO, ValidateDeleteLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteLanguage(this.permissionRepo, this.input.actorId),
			new ValidateLanguage(this.storageRepo, this.input.languageId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.languageId)
		];
	}
}
