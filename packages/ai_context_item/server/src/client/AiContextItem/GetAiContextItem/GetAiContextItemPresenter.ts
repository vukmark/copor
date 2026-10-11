import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetAiContextItemViewModel} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemViewModel';

export class GetAiContextItemPresenter
	extends PresenterInstance<GetAiContextItemDTO, GetAiContextItemViewModel> {
	present(): GetAiContextItemViewModel {
		return {
			id: this.input.id,
			questionDe: this.input.questionDe,
			answerDe: this.input.answerDe,
			questionEn: this.input.questionEn,
			answerEn: this.input.answerEn
		};
	}
}