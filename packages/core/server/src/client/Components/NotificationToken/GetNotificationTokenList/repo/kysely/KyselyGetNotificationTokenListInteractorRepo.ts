import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {db} from '@copor/core/client/AppDataSource';
import {
	GetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export class KyselyGetNotificationTokenListInteractorRepo implements GetNotificationTokenListRepo {
	public async load(userIdList: string[]): Promise<GetNotificationTokenDTO[]> {
		if (userIdList.length === 0) {
			return [];
		}

		const result = await db.selectFrom('notificationToken')
			.select([
				'token as token',
				'userId as user',
				'type as type'
			])
			.where('userId', 'in', userIdList)
			.execute();

		return result.map((r) => {
			return {
				... r,
				user: r.user!,
				type: r.type as NotificationTokenType
			};
		});
	}
}
