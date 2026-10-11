import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {CloudFileHelper} from '@copor/cloud/client/Cloud/CloudFileHelper';

export class KyselyDeleteFileInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const file = await trx.selectFrom('cloudFile')
				.selectAll()
				.where('id', '=', itemId)
				.executeTakeFirst();

			if (!file)
				throw new Error('File not found');
			switch (file.sharingType) {
				case SharingType.USER_GROUP :
					await trx.deleteFrom('fileUserGroupMap')
						.where('fileId', '=', itemId)
						.execute();
					break;
				case SharingType.PUBLIC :
					await trx.deleteFrom('fileUserMap')
						.where('fileId', '=', itemId)
						.execute();
					break;
			}
			await trx.deleteFrom('cloudFile')
				.where('id', '=', itemId)
				.execute();
			const extension = file.name.split('.').pop()!;

			await CloudFileHelper.deleteFile({fileId: itemId}, extension);
		});
	}
}