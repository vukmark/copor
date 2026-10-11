import {GetAiContextItemViewModel} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemViewModel';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';

export class FakeGetAiContextItemListInteractorRepo implements ListItems<GetAiContextItemDTO> {
	public list(): Promise<GetAiContextItemViewModel[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'id1',
					questionDe: 'questionDe1',
					answerDe: 'answerDe1',
					questionEn: 'questionEn1',
					answerEn: 'answerEn1'
				},
				{
					id: 'id2',
					questionDe: 'questionDe2',
					answerDe: 'answerDe2',
					questionEn: 'questionEn2',
					answerEn: 'answerEn2'
				}
			]);
		});
	}
}