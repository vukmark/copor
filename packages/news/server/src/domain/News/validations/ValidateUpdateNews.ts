import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateNewsRepo} from '@copor/news/domain/News/repository/ValidateUpdateNewsRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanUpdateNews
} from '@copor/news/domain/News/validations/permissions/ValidateCanUpdateNews';
import {ValidateEmptyNewsContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyNewsContent';
import {ValidateNews} from '@copor/news/domain/News/validations/ValidateNews';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';
import {ValidateUpdateNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateUpdateNewsDTO';

export class ValidateUpdateNews extends ValidationWithPermissionAndRepo<
	ValidateUpdateNewsDTO,
	ValidateUpdateNewsRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateNews(this.permissionRepo, this.input.actorId),
			new ValidateNews(this.storageRepo, this.input.id),
			new ValidateEmptyNewsContent(this.input.content),
			new ValidateEmptyTitle(this.input.title)
		];
	}
}