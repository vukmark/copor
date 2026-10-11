import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';
import {emitModuleEvent} from '@copor/core/client/Core/Module/ModuleEvents';

export class KyselyDeleteTagInteractorRepo implements DeleteItem {
	async delete(tagId: string): Promise<void> {
		await db
			.deleteFrom('tag')
			.where('id', '=', tagId)
			.execute();

		await emitModuleEvent('tagDeleted', {tagId});
	}
}