import {ValidateCanGetUserGroupTree} from './validator/ValidateCanGetUserGroupTree';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetUserGroupTree extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserGroupTree(this.permissionRepo, this.input)
		];
	}
}
