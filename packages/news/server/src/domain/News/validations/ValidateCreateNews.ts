import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanCreateNews,
	ValidateCanCreateNewsContext
} from '@copor/news/domain/News/validations/permissions/ValidateCanCreateNews';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateNewsRepo} from '@copor/news/domain/News/repository/ValidateCreateNewsRepo';
import {ValidateCreateNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateCreateNewsDTO';
import {ValidateEmptyNewsContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyNewsContent';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';

export class ValidateCreateNews extends ValidationWithPermissionAndRepo<
	ValidateCreateNewsDTO,
	ValidateCreateNewsRepo,
	ValidateCanCreateNewsContext
> {
	public getValidators(): Validator[] {
		const context: ValidateCanCreateNewsContext = {newsId: this.input.actorId};

		return [
			new ValidateCanCreateNews(this.permissionRepo, this.input.actorId, context),
			new ValidateEmptyNewsContent(this.input.content),
			new ValidateEmptyTitle(this.input.title)
		];
	}
}