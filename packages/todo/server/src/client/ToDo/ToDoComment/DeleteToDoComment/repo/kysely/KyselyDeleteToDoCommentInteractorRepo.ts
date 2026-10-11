import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteToDoCommentInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('toDoComment')
			.where('id', '=', itemId)
			.execute();
	}
}