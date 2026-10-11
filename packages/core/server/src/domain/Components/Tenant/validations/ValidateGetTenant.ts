import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateTenant';
import {ValidateCanGetTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetTenant';
import {ValidateGetTenantDTO} from './dto/ValidateGetTenantDTO';
import {ValidateGetTenantRepo} from './dto/ValidateGetTenantRepo';

export class ValidateGetTenant extends ValidationWithPermissionAndRepo<ValidateGetTenantDTO, ValidateGetTenantRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetTenant(this.permissionRepo, this.input.actorId),
			new ValidateTenant(this.storageRepo, this.input.tenantId),
		];
	}
}
