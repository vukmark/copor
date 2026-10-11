import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SaveTenantDTO} from '../interactor/dto/SaveTenantDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateTenant';
import {ValidateUpdateTenantRepo} from '../repository/ValidateUpdateTenantRepo';
import {ValidateEmptyAddress} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyAddress';
import {ValidateCanUpdateTenant} from './permissions/ValidateCanUpdateTenant';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateRegionCity} from '@copor/core/domain/Core/Validations/Validators/ValidateRegionCity';

export class ValidateUpdateTenant extends ValidationWithPermissionAndRepo<SaveTenantDTO, ValidateUpdateTenantRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanUpdateTenant(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyAddress(this.input.addressStreet),
			new ValidateRegionCity(this.storageRepo, this.input.regionCityId),
			new ValidateTenant(this.storageRepo, this.input.id)
		];

		if (this.input.contractSignedBy)
			validators.push(new ValidateUser(this.storageRepo, this.input.contractSignedBy));

		return validators;
	}
}

