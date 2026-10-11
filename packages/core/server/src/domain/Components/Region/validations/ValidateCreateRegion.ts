import {ValidateCreateRegionRepo} from '../repository/ValidateCreateRegionRepo';
import {ValidateCanCreateRegion} from './permissions/ValidateCanCreateRegion';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateCreateRegionDTO} from './dto/ValidateCreateRegionDTO';

export class ValidateCreateRegion
	extends ValidationWithPermissionAndRepo<ValidateCreateRegionDTO, ValidateCreateRegionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateRegion(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.country),
			new ValidateState(this.storageRepo, this.input.state)
		];
	}
}
