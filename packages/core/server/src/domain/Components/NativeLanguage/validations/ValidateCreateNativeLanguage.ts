import {CreateNativeLanguageDTO} from '../interactor/dto/CreateNativeLanguageDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanCreateNativeLanguage} from './permissions/ValidateCanCreateNativeLanguage';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateCreateNativeLanguage extends ValidationWithPermission<CreateNativeLanguageDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateNativeLanguage(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyName(this.input.nativeName),
			new ValidateEmptyCode(this.input.code)
		];
	}
}