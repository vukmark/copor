import {ValidateCanCreateCountry} from './permissions/ValidateCanCreateCountry';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateCreateCountryDTO} from './dto/ValidateCreateCountryDTO';

export class ValidateCreateCountry extends ValidationWithPermission<ValidateCreateCountryDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateCountry(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyCode(this.input.code)
		];
	}
}
