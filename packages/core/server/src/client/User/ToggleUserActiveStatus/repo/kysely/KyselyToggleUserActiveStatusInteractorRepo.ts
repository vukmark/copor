import {ToggleUserActiveStatusRepo} from '@copor/core/domain/User/repository/ToggleUserActiveStatusRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyToggleUserActiveStatusInteractorRepo implements ToggleUserActiveStatusRepo {
	async updateIsActive(id: string, isActive: boolean): Promise<void> {
		await db
			.updateTable('user')
			.set({isActive: Number(isActive)})
			.where('id', '=', id)
			.execute();
	}
}
