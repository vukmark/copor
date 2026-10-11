import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SaveNativeLanguageDTO} from '../interactor/dto/SaveNativeLanguageDTO';
import {ValidateUpdateNativeLanguageRepo} from '../repository/ValidateUpdateNativeLanguageRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdateNativeLanguage} from './permissions/ValidateCanUpdateNativeLanguage';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateNativeLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateNativeLanguage';

export class ValidateUpdateNativeLanguage extends ValidationWithPermissionAndRepo<SaveNativeLanguageDTO, ValidateUpdateNativeLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateNativeLanguage(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyName(this.input.nativeName),
			new ValidateEmptyCode(this.input.code),
			new ValidateNativeLanguage(this.storageRepo, this.input.id)
		];
	}
}