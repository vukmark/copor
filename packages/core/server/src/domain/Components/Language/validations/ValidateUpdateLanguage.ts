import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SaveLanguageDTO} from '../interactor/dto/SaveLanguageDTO';
import {ValidateUpdateLanguageRepo} from '../repository/ValidateUpdateLanguageRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdateLanguage} from './permissions/ValidateCanUpdateLanguage';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateLanguage';

export class ValidateUpdateLanguage extends ValidationWithPermissionAndRepo<SaveLanguageDTO, ValidateUpdateLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateLanguage(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyName(this.input.nativeName),
			new ValidateEmptyCode(this.input.code),
			new ValidateLanguage(this.storageRepo, this.input.id)
		];
	}
}