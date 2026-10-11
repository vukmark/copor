import {ValidateDeleteRegionDTO} from './dto/ValidateDeleteRegionDTO';
import {ValidateDeleteRegionRepo} from '../repository/ValidateDeleteRegionRepo';
import {ValidateCanDeleteRegion} from './permissions/ValidateCanDeleteRegion';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateRegion} from '@copor/core/domain/Core/Validations/Validators/ValidateRegion';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteRegion
	extends ValidationWithPermissionAndRepo<ValidateDeleteRegionDTO, ValidateDeleteRegionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteRegion(this.permissionRepo, this.input.actorId),
			new ValidateRegion(this.storageRepo, this.input.regionId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.regionId)
		];
	}
}
