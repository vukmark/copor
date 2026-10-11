import {ValidateCanGetUserGroupList} from './validator/ValidateCanGetUserGroupList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetUserGroupList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserGroupList(this.permissionRepo, this.input)
		];
	}
}
