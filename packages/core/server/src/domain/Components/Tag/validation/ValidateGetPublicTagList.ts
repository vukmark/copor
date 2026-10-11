import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetPublicTagList} from '@copor/core/domain/Components/Tag/validation/permissions/ValidateCanGetPublicTagList';

export class ValidateGetPublicTagList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetPublicTagList(this.permissionRepo, this.input)];
	}
}