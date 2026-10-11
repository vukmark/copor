import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateUpdateAiContextItemDTO';
import {ValidateUpdateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateUpdateAiContextItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanUpdateAiContextItem
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanUpdateAiContextItem';
import {ValidateEmptyQuestion} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyQuestion';
import {ValidateEmptyAnswer} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyAnswer';

export class ValidateUpdateAiContextItem extends ValidationWithPermissionAndRepo<
	ValidateUpdateAiContextItemDTO,
	ValidateUpdateAiContextItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateAiContextItem(this.permissionRepo, this.input.actorId),
			new ValidateEmptyAnswer(this.input.answerDe),
			new ValidateEmptyAnswer(this.input.answerEn),
			new ValidateEmptyQuestion(this.input.questionDe),
			new ValidateEmptyQuestion(this.input.questionEn)
		];
	}
}