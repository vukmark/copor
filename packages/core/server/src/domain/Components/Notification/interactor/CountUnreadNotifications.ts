import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {CountUnreadNotificationsRepo} from '../repository/CountUnreadNotificationsRepo';
import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';

export class CountUnreadNotifications extends ExecuteUseCase<string, CountUnreadNotificationsRepo, GetNotificationCounterDTO> {
	public execute(): Promise<GetNotificationCounterDTO> {
		return this.repository.countUnread(this.input);
	}
}