import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteNotificationTokenInteractorRepo implements DeleteItem {
	public async delete(token: string): Promise<void> {
		await db
			.deleteFrom('notificationToken')
			.where('token', '=', token)
			.execute();
	}
}