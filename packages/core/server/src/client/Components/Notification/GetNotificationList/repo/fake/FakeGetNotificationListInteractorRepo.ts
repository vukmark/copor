import {GetNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationDTO';
import {GetNotificationListRepo} from '@copor/core/domain/Components/Notification/repository/GetNotificationListRepo';

export class FakeGetNotificationListInteractorRepo implements GetNotificationListRepo {
	public load(userId: string): Promise<GetNotificationDTO[]> {
		return new Promise((resolve) => {
			resolve([{
				id: 'id',
				title: 'Aco Kroner',
				description: 'Ima li votkice',
				user: 'uid',
				seen: false
			}]
			);
		});
	}
}
