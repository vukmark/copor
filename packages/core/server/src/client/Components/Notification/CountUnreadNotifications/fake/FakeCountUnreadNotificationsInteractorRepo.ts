import {CountUnreadNotificationsRepo}
	from '@copor/core/domain/Components/Notification/repository/CountUnreadNotificationsRepo';
import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';

export class FakeCountUnreadNotificationsInteractorRepo implements CountUnreadNotificationsRepo {
	public countUnread(userId: string): Promise<GetNotificationCounterDTO> {
		return new Promise((resolve) => {
			resolve({
				vuMeet: 10,
				todo: 12
			});
		});
	}
}
