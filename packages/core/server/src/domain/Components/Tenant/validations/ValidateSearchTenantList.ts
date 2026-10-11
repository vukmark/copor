import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanSearchTenantList} from './permissions/ValidateCanSearchTenantList';

export class ValidateSearchTenantList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSearchTenantList(this.permissionRepo, this.input)
		];
	}
}