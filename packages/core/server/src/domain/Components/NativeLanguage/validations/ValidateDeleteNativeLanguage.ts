import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateNativeLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateNativeLanguage';
import {ValidateCanDeleteNativeLanguage} from './permissions/ValidateCanDeleteNativeLanguage';
import {ValidateDeleteNativeLanguageRepo} from '../repository/ValidateDeleteNativeLanguageRepo';
import {ValidateDeleteNativeLanguageDTO} from './dto/ValidateDeleteNativeLanguageDTO';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteNativeLanguage extends ValidationWithPermissionAndRepo<ValidateDeleteNativeLanguageDTO, ValidateDeleteNativeLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteNativeLanguage(this.permissionRepo, this.input.actorId),
			new ValidateNativeLanguage(this.storageRepo, this.input.languageId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.languageId)
		];
	}
}
