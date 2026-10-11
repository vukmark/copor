import {ValidateCanGetRoleList} from './permissions/ValidateCanGetRoleList';
import {ValidationWithPermission} from '../../../Core/Validations/ValidationWithPermission';
import {Validator} from '../../../Core/Validations/Validators/Validator';

export class ValidateGetRoleList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRoleList(this.permissionRepo, this.input)
		];
	}
}