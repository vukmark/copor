import {ValidateUpdateRegionRepo} from '../repository/ValidateUpdateRegionRepo';
import {ValidateCanUpdateRegion} from './permissions/ValidateCanUpdateRegion';
import {SaveRegionDTO} from '../interactor/dto/SaveRegionDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidatePostalCode} from '@copor/core/domain/Core/Validations/Validators/ValidatePostalCode';

export class ValidateUpdateRegion extends ValidationWithPermissionAndRepo<SaveRegionDTO, ValidateUpdateRegionRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateRegion(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.country),
			new ValidateState(this.storageRepo, this.input.state),
			new ValidatePostalCode(this.input.postalCode)
		];
	}
}