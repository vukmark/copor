import {ValidateCanCreateState} from './permissions/ValidateCanCreateState';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateCreateStateRepo} from '../repository/ValidateCreateStateRepo';
import {ValidateCreateStateDTO} from './dto/ValidateCreateStateDTO';

export class ValidateCreateState
	extends ValidationWithPermissionAndRepo<ValidateCreateStateDTO, ValidateCreateStateRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateState(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyCode(this.input.code),
			new ValidateCountry(this.storageRepo, this.input.countryId)
		];
	}
}