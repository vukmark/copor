import {
	GetNotificationTokenDTO
} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {
	GetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export class FakeGetNotificationTokenListInteractorRepo implements GetNotificationTokenListRepo {
	public load(userIdList: string[]): Promise<GetNotificationTokenDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					token: 'token',
					user: 'user',
					type: NotificationTokenType.IOS
				}]
			);
		});
	}
}
