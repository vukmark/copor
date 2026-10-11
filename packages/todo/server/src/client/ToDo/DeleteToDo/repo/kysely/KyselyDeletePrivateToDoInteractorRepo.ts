import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeletePrivateToDoInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('privateToDo')
			.where('id', '=', itemId)
			.execute();

		await db
			.deleteFrom('toDoTagMap')
			.where('toDoId', '=', itemId)
			.execute();
	}
}