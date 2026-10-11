import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetAiContextItemInteractorRepo
implements GetItem<GetAiContextItemDTO> {
	async load(id: string): Promise<GetAiContextItemDTO> {
		const result = await db
			.selectFrom('aiContextItem as aic')
			.where('aic.id', '=', id)
			.select([
				'aic.id as id',
				'aic.answerDe as answerDe',
				'aic.answerEn as answerEn',
				'aic.questionDe as questionDe',
				'aic.questionEn as questionEn'
			])
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Ai Context item with id ${id} not found`);
		}

		return {
			id: result.id,
			answerDe: result.answerDe,
			answerEn: result.answerEn,
			questionDe: result.questionDe,
			questionEn: result.questionEn
		};
	}
}