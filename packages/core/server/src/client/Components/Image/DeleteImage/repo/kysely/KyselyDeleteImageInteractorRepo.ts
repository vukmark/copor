import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyDeleteImageInteractorRepo implements DeleteItem {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async delete(itemId: string): Promise<void> {
		const image = await db
			.selectFrom('image')
			.select(['name', 'extension'])
			.where('id', '=', itemId)
			.executeTakeFirst();

		if (!image)
			throw new Error(`image with id ${itemId} does not exist`);
		await ImageHelper.deleteImageFile(this.appContext.envVariables!.IMAGE_UPLOAD_FOLDER, image.name!, image.extension!);

		await db.deleteFrom('image')
			.where('id', '=', itemId)
			.execute();
	}
}