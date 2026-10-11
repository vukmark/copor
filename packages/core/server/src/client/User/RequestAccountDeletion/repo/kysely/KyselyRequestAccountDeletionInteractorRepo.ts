import {RequestAccountDeletionRepo} from '@copor/core/domain/User/repository/RequestAccountDeletionRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyRequestAccountDeletionInteractorRepo implements RequestAccountDeletionRepo {
	async requestDeletion(userId: string): Promise<void> {
		await db
			.updateTable('user')
			.set({deletionRequested: true})
			.where('id', '=', userId)
			.execute();
	}
}
