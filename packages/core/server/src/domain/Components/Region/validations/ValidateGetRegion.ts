import {ValidateDeleteRegionDTO} from './dto/ValidateDeleteRegionDTO';
import {ValidateCanGetRegion} from './permissions/ValidateCanGetRegion';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateRegion} from '@copor/core/domain/Core/Validations/Validators/ValidateRegion';
import {ValidateGetRegionRepo} from '../repository/ValidateGetRegionRepo';

export class ValidateGetRegion
	extends ValidationWithPermissionAndRepo<ValidateDeleteRegionDTO, ValidateGetRegionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRegion(this.permissionRepo, this.input.actorId),
			new ValidateRegion(this.storageRepo, this.input.regionId)
		];
	}
}