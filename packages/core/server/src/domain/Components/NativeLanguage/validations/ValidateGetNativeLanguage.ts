import {ValidateGetNativeLanguageDTO} from './dto/ValidateGetNativeLanguageDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetNativeLanguage} from './permissions/ValidateCanGetNativeLanguage';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateNativeLanguage} from '@copor/core/domain/Core/Validations/Validators/ValidateNativeLanguage';
import {ValidateGetNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/ValidateGetNativeLanguageRepo';

export class ValidateGetNativeLanguage extends ValidationWithPermissionAndRepo<ValidateGetNativeLanguageDTO, ValidateGetNativeLanguageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetNativeLanguage(this.permissionRepo, this.input.actorId),
			new ValidateNativeLanguage(this.storageRepo, this.input.languageId)
		];
	}
}