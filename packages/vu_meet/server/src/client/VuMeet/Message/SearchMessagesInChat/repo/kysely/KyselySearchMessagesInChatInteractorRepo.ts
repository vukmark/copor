import {db} from '@copor/core/client/AppDataSource';
import {SearchMessagesInChatRepo}
	from '@copor/vu_meet/domain/VuMeet/Message/repository/SearchMessagesInChatRepo';
import {SearchMessagesInChatDTO}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

export class KyselySearchMessagesInChatInteractorRepo
implements SearchMessagesInChatRepo {
	public async search(prompt: string, chatId: string): Promise<SearchMessagesInChatDTO[]> {
		const formattedPrompt = `%${prompt.trim().replace(/\s+/g, '%')}%`;

		const results = await db.selectFrom('message')
			.innerJoin('user', 'user.id', 'message.senderId')
			.leftJoin('image', 'image.id', 'user.profileImageId')
			.select([
				'message.id as messageId',
				'message.content as messageContent',
				'message.type as messageType',
				'message.senderId',
				'message.seen as messageSeen',
				'message.createdAt',
				'user.firstName as senderFirstName',
				'user.lastName as senderLastName',
				'image.path as senderProfileImagePath'
			])
			.where('message.chatId', '=', chatId)
			.where('message.content', 'like', formattedPrompt)
			.execute();

		return results.map((r) => ({... r, senderId: r.senderId ?? '', senderFirstName: r.senderFirstName ?? '', senderLastName: r.senderLastName ?? '', senderProfileImagePath: r.senderProfileImagePath ?? ''}));
	}
}
