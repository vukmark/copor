import {SaveStateDTO} from '../interactor/dto/SaveStateDTO';
import {ValidateUpdateStateRepo} from '../repository/ValidateUpdateStateRepo';
import {ValidateCanUpdateState} from './permissions/ValidateCanUpdateState';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyCode} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyCode';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';

export class ValidateUpdateState
	extends ValidationWithPermissionAndRepo<SaveStateDTO, ValidateUpdateStateRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateState(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyCode(this.input.code),
			new ValidateState(this.storageRepo, this.input.id),
			new ValidateCountry(this.storageRepo, this.input.countryId)
		];
	}
}