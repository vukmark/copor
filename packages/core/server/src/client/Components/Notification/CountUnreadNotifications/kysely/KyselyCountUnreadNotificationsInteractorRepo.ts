import {
	CountUnreadNotificationsRepo
} from '@copor/core/domain/Components/Notification/repository/CountUnreadNotificationsRepo';
import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';
import {getRegisteredModules} from '@copor/core/client/Core/Module/ModuleRegistry';

// Collects every module's counts. The Desk badge (`todo`) has no defined
// meaning yet, so nothing contributes it and the frontend shows 0.
export class KyselyCountUnreadNotificationsInteractorRepo implements CountUnreadNotificationsRepo {
	public async countUnread(userId: string): Promise<GetNotificationCounterDTO> {
		const counts = await Promise.all(getRegisteredModules().map((module) => module.notificationCounters?.(userId) ?? {}));

		return Object.assign({}, ...counts) as GetNotificationCounterDTO;
	}
}
