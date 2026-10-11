import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateNews} from '@copor/news/domain/News/validations/ValidateNews';
import {ValidateCanGetNews} from '@copor/news/domain/News/validations/permissions/ValidateCanGetNews';
import {ValidateGetNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateGetNewsDTO';
import {ValidateGetNewsRepo} from '@copor/news/domain/News/repository/ValidateGetNewsRepo';

export class ValidateGetNews extends ValidationWithPermissionAndRepo<
	ValidateGetNewsDTO,
	ValidateGetNewsRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetNews(this.permissionRepo, this.input.actorId),
			new ValidateNews(this.storageRepo, this.input.newsId)
		];
	}
}