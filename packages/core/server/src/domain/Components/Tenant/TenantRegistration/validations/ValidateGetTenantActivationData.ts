import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';
import {ValidateGetTenantActivationDataDTO} from './dto/ValidateGetTenantActivationDataDTO';
import {ValidateGetTenantActivationDataRepo} from '../repository/ValidateGetTenantActivationDataRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateTenant';
import {ValidateIsBaseTenant} from '@copor/core/domain/Core/Validations/Validators/ValidateIsBaseTenant';
import {ValidateIsTenantAlreadyActivated} from '@copor/core/domain/Core/Validations/Validators/ValidateIsTenantAlreadyActivated';

export class ValidateGetTenantActivationData
	extends ValidationWithRepo<ValidateGetTenantActivationDataDTO, ValidateGetTenantActivationDataRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateTenant(this.storageRepo, this.input.tenantId),
			new ValidateIsBaseTenant(this.storageRepo, this.input.tenantId),
			new ValidateIsTenantAlreadyActivated(this.storageRepo, this.input.tenantId)
		];

		return validators;
	}
}