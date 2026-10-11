import {GetMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageDTO';
import {GetMessageListRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetMessageListRepo';
import {db} from '@copor/core/client/AppDataSource';
import {Preferences} from '@copor/core/client/Global/Preferences';

export class KyselyGetMessageListInteractorRepo
implements GetMessageListRepo {
	public async list(chatId: string, beforeDate: string, afterDate: string): Promise<GetMessageDTO[]> {
		let query = db.selectFrom('message')
			.innerJoin('user', 'user.id', 'message.senderId')
			.innerJoin('chat', 'message.chatId', 'chat.id')
			.leftJoin('image', 'image.id', 'user.profileImageId')
			.select([
				'message.id',
				'message.content',
				'message.type',
				'message.senderId',
				'message.seen',
				'message.createdAt',
				'user.firstName as senderFirstName',
				'user.lastName as senderLastName',
				'image.name as senderPictureName',
				'image.extension as senderPictureExtension',
				'chat.isPrivate'
			])
			.where('message.chatId', '=', chatId);

		if (beforeDate) {
			query = query.where('message.createdAt', '<', new Date(beforeDate));
		}

		if (afterDate)
			query = query.where('message.createdAt', '>', new Date(afterDate));

		const messages = query
			.orderBy('createdAt desc')
			.limit(Preferences.getVuMeetMessageLimit());

		const results = await messages.execute();

		return results.map((r) => ({... r, senderId: r.senderId ?? '', senderFirstName: r.senderFirstName ?? '', senderLastName: r.senderLastName ?? '', senderPictureName: r.senderPictureName ?? undefined, senderPictureExtension: r.senderPictureExtension ?? undefined}));
	}
}
