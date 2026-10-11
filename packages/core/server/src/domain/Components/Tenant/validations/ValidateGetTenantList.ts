import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetTenantList} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetTenantList';

export class ValidateGetTenantList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetTenantList(this.permissionRepo, this.input)];
	}
}
