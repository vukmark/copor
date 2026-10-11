import {MarkChatMessagesSeenRepo}
	from '@copor/vu_meet/domain/VuMeet/Chat/repository/MarkChatMessagesSeenRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyMarkChatMessagesSeenInteractorRepo implements MarkChatMessagesSeenRepo {
	async markChatMessagesRead(chatId: string, userId: string): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.updateTable('message')
				.set({seen: true})
				.where('chatId', '=', chatId)
				.where('senderId', '!=', userId)
				.where('seen', '=', false)
				.execute();

			await trx
				.insertInto('messageSeen')
				.columns(['messageId', 'userId'])
				.expression((eb) => eb
					.selectFrom('message')
					.select(['id as messageId', eb.val(userId).as('userId')])
					.where('chatId', '=', chatId)
					.where('senderId', '!=', userId))
				.ignore()
				.execute();
		});
	}
}
