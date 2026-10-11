import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';
import {GetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatWithUserRepo';
import {DuplicateChatMemberException} from '@copor/vu_meet/domain/VuMeet/Core/exception/DuplicateChatMemberException';
import {isDuplicateEntryError} from '@copor/core/client/Core/Database/isDuplicateEntryError';

export class KyselyGetChatWithUserInteractorRepo implements GetChatWithUserRepo {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	async load(actorId: string, users: string[], uniqueId: string, chatName: string): Promise<string> {
		users.push(actorId);
		const existingChat = await this.getExistingChatId(users);

		if (existingChat) {
			return existingChat;
		}
		await db.transaction().execute(async (trx) => {
			await trx
				.insertInto('chat')
				.values({
					id: uniqueId,
					name: chatName,
					picture: '',
					lastMessage: '',
					isPrivate: users.length < 3,
					lastMessageSentBy: actorId
				})
				.execute();


			const userMapValues = users.map((user) => ({
				chatId: uniqueId,
				userId: user
			}));

			if (userMapValues.length > 0) {
				try {
					await trx
						.insertInto('chatUserMap')
						.values(userMapValues)
						.execute();
				} catch (error) {
					if (isDuplicateEntryError(error))
						throw new DuplicateChatMemberException();
					throw error;
				}
			}
		});

		return uniqueId;
	}

	private async getExistingChatId(users: string[]) : Promise<string | null> {
		const existingChatQuery = sql<{chatId: string}>`

            SELECT chat_id
            FROM chat_user_map
            GROUP BY chat_id
            HAVING
                COUNT(DISTINCT CASE WHEN user_id IN (${sql.join(users)}) THEN user_id END) = ${users.length}
               -- Condition 2: No other users should be present in this chat_id
               AND COUNT(DISTINCT user_id) = ${users.length};
           `;

		const existingChatResult = await existingChatQuery.execute(db);

		if (existingChatResult.rows.length == 1)
			return existingChatResult.rows[0].chatId;

		return null;
	}
}
