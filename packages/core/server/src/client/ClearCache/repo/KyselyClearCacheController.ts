import {db} from '@copor/core/client/AppDataSource';

export class KyselyClearUserPermissionCacheRepo {
	async execute(): Promise<void> {
		await db
			.deleteFrom('userPermissionCache')
			.execute();
	}
}