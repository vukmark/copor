import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';

export class ChatKyselyHelper {
	static async isInvalidChat(privateChatId: string | undefined): Promise<boolean> {
		if (!privateChatId)
			return true;
		const query = sql`
            SELECT id
            FROM chat
            WHERE id = ${privateChatId}
		`;
		const chat = await query.execute(db);

		return !chat;
	}

	static async isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		if (!userId || !chatId) {
			return true;
		}
		const query = sql`
            SELECT user_id
            FROM chat_user_map
            WHERE chat_id = ${chatId}
	        AND user_id = ${userId}
		`;
		const chat = await query.execute(db);

		return !chat;
	}
}