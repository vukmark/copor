import {MessageCreatedNotificationTranslationData}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/MessageCreatedNotificationTranslationData';
import {SaveNotificationRepo}
	from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';
import {SaveNotificationDTO}
	from '@copor/core/domain/Components/Notification/interactor/dto/SaveNotificationDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselySaveCreatedMessageNotificationRepo
implements SaveNotificationRepo<SaveNotificationDTO<MessageCreatedNotificationTranslationData>> {
	async save(saveDto: SaveNotificationDTO<MessageCreatedNotificationTranslationData>): Promise<string> {
		const timestamp = TimestampHelper.getTimestampForCreate(saveDto.userId);

		await db
			.insertInto('notification')
			.values({
				id: saveDto.id,
				userId: saveDto.userId,
				seen: saveDto.seen,
				title: saveDto.title,
				... timestamp
			})
			.execute();


		await db
			.insertInto('messageNotification')
			.values({
				notificationId: saveDto.id,
				author: saveDto.translationData.author,
				previewText: saveDto.translationData.previewText
			})
			.execute();
		return saveDto.userId;
	}
}
