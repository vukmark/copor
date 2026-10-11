import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {db} from '@copor/core/client/AppDataSource';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateAiContextItemInteractorRepo
implements SaveItem<SaveAiContextItemDTO> {
	async save(saveDTO:SaveAiContextItemDTO): Promise<void> {
		await db
			.insertInto('aiContextItem')
			.values({
				id: saveDTO.id,
				questionDe: saveDTO.questionDe,
				questionEn: saveDTO.questionEn,
				answerDe: saveDTO.answerDe,
				answerEn: saveDTO.answerEn,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}