import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteUserInteractorRepo implements DeleteItem {
	async delete(id: string): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const user = await trx
				.selectFrom('user')
				.select(['id', 'authUserId'])
				.where('id', '=', id)
				.executeTakeFirstOrThrow();


			await trx.deleteFrom('user').where('id', '=', user.id).execute();

			const otherUsers = await trx
				.selectFrom('user')
				.select('id')
				.where('authUserId', '=', user.authUserId)
				.where('id', '!=', user.id)
				.execute();

			if (otherUsers.length === 0) {
				await trx.deleteFrom('authUser').where('id', '=', user.authUserId).execute();
			}
		});
	}
}
