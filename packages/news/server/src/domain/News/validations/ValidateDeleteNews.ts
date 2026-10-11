import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateDeleteNewsDTO';
import {ValidateDeleteNewsRepo} from '@copor/news/domain/News/repository/ValidateDeleteNewsRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanDeleteNews} from '@copor/news/domain/News/validations/permissions/ValidateCanDeleteNews';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateNews} from '@copor/news/domain/News/validations/ValidateNews';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteNews extends ValidationWithPermissionAndRepo<
	ValidateDeleteNewsDTO,
	ValidateDeleteNewsRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteNews(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.newsId),
			new ValidateNews(this.storageRepo, this.input.newsId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.newsId)
		];
	}
}