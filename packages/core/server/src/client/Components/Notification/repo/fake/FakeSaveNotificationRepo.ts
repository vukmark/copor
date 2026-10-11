import {SaveNotificationRepo}
	from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';

export class FakeSaveNotificationRepo<InputDTO> implements SaveNotificationRepo<InputDTO> {
	save(saveDto: InputDTO): Promise<string> {
		return Promise.resolve('notificationId');
	}
}
