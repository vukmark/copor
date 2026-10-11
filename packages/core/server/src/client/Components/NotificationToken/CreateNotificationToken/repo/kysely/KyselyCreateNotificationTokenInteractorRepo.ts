import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNotificationTokenDTO}
	from '@copor/core/domain/Components/NotificationToken/interactor/dto/SaveNotificationTokenDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateNotificationTokenInteractorRepo implements SaveItem<SaveNotificationTokenDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	async save(saveDTO: SaveNotificationTokenDTO): Promise<void> {
		const existingToken = await db
			.selectFrom('notificationToken')
			.select(['userId', 'id'])
			.where('token', '=', saveDTO.token)
			.executeTakeFirst();

		if (existingToken && existingToken.userId === saveDTO.user)
			return;
		if (existingToken) {
			await db.updateTable('notificationToken')
				.set({
					userId: saveDTO.user,
					... TimestampHelper.getTimestampForUpdate(saveDTO.user)
				})
				.where('id', '=', existingToken.id)
				.execute();
			return;
		}

		await db
			.insertInto('notificationToken')
			.values({
				id: saveDTO.id,
				token: saveDTO.token,
				type: saveDTO.type,
				userId: saveDTO.user,
				... TimestampHelper.getTimestampForCreate(saveDTO.user)
			})
			.execute();
	}
}
