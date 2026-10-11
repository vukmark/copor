import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetAiContextItemViewModel} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemViewModel';

export class GetAiContextItemListPresenter
	extends PresenterInstance<GetAiContextItemDTO [], GetAiContextItemViewModel []> {
	public present(): GetAiContextItemViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			questionDe: dto.questionDe,
			answerDe: dto.answerDe,
			questionEn: dto.questionEn,
			answerEn: dto.answerEn
		}));
	}
}