import {AiContextItemRow} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/AiContextItemRow';
import {db} from '@copor/core/client/AppDataSource';

export class AiContextItemRepo {
	public static async getAll(): Promise<AiContextItemRow[]> {
		return db
			.selectFrom('aiContextItem')
			.select(['id', 'questionDe', 'answerDe', 'questionEn', 'answerEn'])
			.execute();
	}
}