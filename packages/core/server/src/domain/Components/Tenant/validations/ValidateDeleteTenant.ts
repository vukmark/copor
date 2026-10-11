import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteTenantDTO} from './dto/ValidateDeleteTenantDTO';
import {ValidateDeleteTenantRepo} from '../repository/ValidateDeleteTenantRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanDeleteTenant} from './permissions/ValidateCanDeleteTenant';
import {ValidateTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateTenant';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteTenant
	extends ValidationWithPermissionAndRepo<ValidateDeleteTenantDTO, ValidateDeleteTenantRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteTenant(this.permissionRepo, this.input.actorId),
			new ValidateTenant(this.storageRepo, this.input.tenantId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.tenantId)
		];
	}
}