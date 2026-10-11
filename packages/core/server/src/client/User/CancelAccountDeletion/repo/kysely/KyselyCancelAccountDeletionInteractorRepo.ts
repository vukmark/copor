import {CancelAccountDeletionRepo} from '@copor/core/domain/User/repository/CancelAccountDeletionRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCancelAccountDeletionInteractorRepo implements CancelAccountDeletionRepo {
	async cancelDeletion(userId: string): Promise<void> {
		await db
			.updateTable('user')
			.set({deletionRequested: false})
			.where('id', '=', userId)
			.execute();
	}
}
