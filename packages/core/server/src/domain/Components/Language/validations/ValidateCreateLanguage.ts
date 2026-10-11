import {CreateLanguageDTO} from '../interactor/dto/CreateLanguageDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanCreateLanguage} from './permissions/ValidateCanCreateLanguage';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateCreateLanguage extends ValidationWithPermission<CreateLanguageDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateLanguage(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyName(this.input.nativeName),
			new ValidateEmptyCode(this.input.code)
		];
	}
}