import {db} from '@copor/core/client/AppDataSource';

// Messages in the user's chats that others sent and the user hasn't seen.
export async function countVuMeetNotifications(userId: string): Promise<Record<string, number>> {
	const result = await db
		.selectFrom('message as pm')
		.innerJoin('chatUserMap as userMap', 'userMap.chatId', 'pm.chatId')
		.leftJoin('messageSeen as ms', (join) => join
			.onRef('ms.messageId', '=', 'pm.id')
			.on('ms.userId', '=', userId))
		.where('pm.senderId', '!=', userId)
		.where('ms.messageId', 'is', null)
		.where('userMap.userId', '=', userId)
		.select(({fn}) => fn.count('pm.id').as('unseenCount'))
		.executeTakeFirstOrThrow();

	return {vuMeet: Number(result.unseenCount)};
}
