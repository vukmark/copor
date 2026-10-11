import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateCreateAiContextItemDTO';
import {ValidateCreateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateCreateAiContextItemRepo';
import {
	ValidateCanCreateAiContextItem,
	ValidateCanCreateAiContextItemContext
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanCreateAiContextItem';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyQuestion} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyQuestion';
import {ValidateEmptyAnswer} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyAnswer';

export class ValidateCreateAiContextItem extends ValidationWithPermissionAndRepo<
	ValidateCreateAiContextItemDTO,
	ValidateCreateAiContextItemRepo,
	ValidateCanCreateAiContextItemContext
> {
	public getValidators(): Validator[] {
		const context: ValidateCanCreateAiContextItemContext = {
			aiContextItemId: this.input.actorId
		};

		return [
			new ValidateCanCreateAiContextItem(this.permissionRepo, this.input.actorId, context),
			new ValidateEmptyAnswer(this.input.answerDe),
			new ValidateEmptyAnswer(this.input.answerEn),
			new ValidateEmptyQuestion(this.input.questionDe),
			new ValidateEmptyQuestion(this.input.questionEn)
		];
	}
}