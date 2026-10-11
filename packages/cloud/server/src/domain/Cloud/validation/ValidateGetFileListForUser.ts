import {ValidateCanGetFileListForUser} from './validator/ValidateCanGetFileListForUser';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetFileListForUser extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetFileListForUser(this.permissionRepo, this.input)
		];
	}
}
