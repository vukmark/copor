import {SaveAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/SaveAiContextItemRepo';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateAiContextItemInteractorRepo
implements SaveAiContextItemRepo {
	async save(saveDTO: SaveAiContextItemDTO): Promise<void> {
		await db
			.updateTable('aiContextItem')
			.set({
				id: saveDTO.id,
				questionEn: saveDTO.questionEn,
				questionDe: saveDTO.questionDe,
				answerEn: saveDTO.answerEn,
				answerDe: saveDTO.answerDe
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}