import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetNewsList
} from '@copor/news/domain/News/validations/permissions/ValidateCanGetNewsList';

export class ValidateGetNewsList extends ValidationWithPermission<
	string
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetNewsList(this.permissionRepo, this.input)
		];
	}
}