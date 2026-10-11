import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {MarkAllNotificationsAsReadRepo} from '../repository/MarkAllNotificationsAsReadRepo';

export class MarkAllNotificationsAsRead extends ExecuteUseCase<string, MarkAllNotificationsAsReadRepo, void> {
	public execute(): Promise<void> {
		return this.repository.markAllAsRead(this.input);
	}
}