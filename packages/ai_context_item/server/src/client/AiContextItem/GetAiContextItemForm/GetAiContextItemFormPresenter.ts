import {FormPresenter} from '@copor/core/client/Core/Form/FormPresenter';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {FormField, RequiredField} from '@copor/core/client/Core/Form/FormField';
import {TextBoxField} from '@copor/core/client/Core/Form/text_inputs/TextBoxField';

interface GetAiContextItemFormPresenterDTO {
	aiContextItem?: GetAiContextItemDTO;
}

export class GetAiContextItemFormPresenter
	extends FormPresenter<GetAiContextItemFormPresenterDTO> {
	protected getEndpoint(): string {
		return '/ai-context-item';
	}

	protected getFormFields(): FormField[] {
		const aiContextItem = this.input.aiContextItem;

		return [
			new QuestionEnField(aiContextItem?.questionDe ?? ''),
			new AnswerEnField(aiContextItem?.answerDe),

			new QuestionDeField(aiContextItem?.questionEn ?? ''),
			new AnswerDeField(aiContextItem?.answerEn)
		];
	}
}

class QuestionEnField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'QUESTION_IS_REQUIRED';
	}
	protected getLabel(): string {
		return 'QUESTION_EN';
	}
	protected getName(): string {
		return 'questionEn';
	}
}

class QuestionDeField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'QUESTION_IS_REQUIRED';
	}
	protected getLabel(): string {
		return 'QUESTION_DE';
	}
	protected getName(): string {
		return 'questionDe';
	}
}

class AnswerEnField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'ANSWER_IS_REQUIRED';
	}
	protected getLabel(): string {
		return 'ANSWER_EN';
	}
	protected getName(): string {
		return 'answerEn';
	}
}

class AnswerDeField extends TextBoxField implements RequiredField {
	getRequiredMessage(): string {
		return 'ANSWER_IS_REQUIRED';
	}
	protected getLabel(): string {
		return 'ANSWER_DE';
	}
	protected getName(): string {
		return 'answerDe';
	}
}