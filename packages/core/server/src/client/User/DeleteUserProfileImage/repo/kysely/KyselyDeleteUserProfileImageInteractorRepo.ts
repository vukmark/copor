import {DeleteUserProfileImageRepo} from '@copor/core/domain/User/repository/DeleteUserProfileImageRepo';
import {db} from '@copor/core/client/AppDataSource';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyDeleteUserProfileImageInteractorRepo implements DeleteUserProfileImageRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async deleteProfileImage(userId: string): Promise<void> {
		const user = await db
			.selectFrom('user')
			.select(['profileImageId'])
			.where('id', '=', userId)
			.executeTakeFirst();

		if (!user?.profileImageId)
			return;

		const image = await db
			.selectFrom('image')
			.select(['name', 'extension'])
			.where('id', '=', user.profileImageId)
			.executeTakeFirst();

		await db
			.updateTable('user')
			.set({profileImageId: null})
			.where('id', '=', userId)
			.execute();

		await db
			.deleteFrom('image')
			.where('id', '=', user.profileImageId)
			.execute();

		if (image?.name && image.extension) {
			await ImageHelper.deleteImageFile(
				this.appContext.envVariables!.IMAGE_UPLOAD_FOLDER,
				image.name,
				image.extension
			);
		}
	}
}
