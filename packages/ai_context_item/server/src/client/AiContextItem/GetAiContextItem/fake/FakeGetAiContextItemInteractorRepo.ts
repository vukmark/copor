import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export class FakeGetAiContextItemInteractorRepo
implements GetItem<GetAiContextItemDTO> {
	load(id: string): Promise<GetAiContextItemDTO> {
		return Promise.resolve({
			id: 'id',
			questionDe: 'questionDe',
			answerDe: 'answerDe',
			questionEn: 'questionEn',
			answerEn: 'answerEn'
		});
	}
}