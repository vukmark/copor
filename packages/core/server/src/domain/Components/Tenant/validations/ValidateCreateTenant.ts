import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateCanCreateTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateCanCreateTenant';
import {ValidateCreateTenantDTO} from './dto/ValidateCreateTenantDTO';
import {ValidateCreateTenantRepo} from '../repository/ValidateCreateTenantRepo';
import {ValidateRegionCity} from '@copor/core/domain/Core/Validations/Validators/ValidateRegionCity';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateEmptyAddress} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyAddress';

export class ValidateCreateTenant extends ValidationWithPermissionAndRepo<ValidateCreateTenantDTO, ValidateCreateTenantRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanCreateTenant(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyAddress(this.input.addressStreet),
			new ValidateRegionCity(this.storageRepo, this.input.regionCityId)
		];

		if (this.input.contractSignedBy)
			validators.push(new ValidateUser(this.storageRepo, this.input.contractSignedBy));
		return validators;
	}
}
