import {db} from '@copor/core/client/AppDataSource';
import {
	GetOtherParticipantsInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetOtherParticipantsInChatRepo';
import {sql} from 'kysely';

export class KyselyGetOtherParticipantsInChatRepo implements GetOtherParticipantsInChatRepo {
	async load(userId: string, chatId: string): Promise<string[]> {
		const query = sql<{userId: string}>`
            SELECT user_id FROM chat_user_map
            WHERE chat_id = ${chatId}
              AND user_id != ${userId}
	        `;

		const result = await query.execute(db);

		return result.rows.map((row) => row.userId);
	}
}
