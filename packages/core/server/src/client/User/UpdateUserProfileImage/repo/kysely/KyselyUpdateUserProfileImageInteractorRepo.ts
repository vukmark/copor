import {SaveUserProfileImageRepo} from '@copor/core/domain/User/repository/SaveUserProfileImageRepo';
import {db} from '@copor/core/client/AppDataSource';
import {ImageHelper, ImageMetadataDTO} from '@copor/core/client/Core/Helpers/ImageHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyUpdateUserProfileImageInteractorRepo implements SaveUserProfileImageRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async save(userId: string, imageBuffer: Buffer, newImageId: string): Promise<void> {
		const uploadFolder = this.appContext.envVariables!.IMAGE_UPLOAD_FOLDER;
		const metadata = await ImageHelper.getImageMetadata(imageBuffer);
		const user = await this.getUser(userId);

		if (!user)
			throw new Error(`User with id ${userId} does not exist`);

		const previousImage = user.profileImageId
			? await this.getImage(user.profileImageId)
			: undefined;

		const filePath = await ImageHelper.saveImageFile(uploadFolder, newImageId, metadata.extension, imageBuffer);

		if (user.profileImageId) {
			await this.updateUserProfileImage(user.profileImageId, newImageId, metadata, filePath);
		} else {
			await this.createNewUserProfileImage(newImageId, metadata, userId, filePath);
		}

		await this.deletePreviousImageFile(uploadFolder, previousImage, newImageId);
	}

	private async getUser(userId: string) {
		return await db
			.selectFrom('user')
			.select(['profileImageId'])
			.where('id', '=', userId)
			.executeTakeFirst();
	}

	private async getImage(imageId: string) {
		return await db
			.selectFrom('image')
			.select(['name', 'extension'])
			.where('id', '=', imageId)
			.executeTakeFirst();
	}

	private async deletePreviousImageFile(
		uploadFolder: string,
		previousImage: {name: string | null, extension: string | null} | undefined,
		newImageName: string
	) {
		if (!previousImage?.name || !previousImage.extension || previousImage.name === newImageName) {
			return;
		}

		await ImageHelper.deleteImageFile(uploadFolder, previousImage.name, previousImage.extension);
	}

	private async createNewUserProfileImage(imageId: string, metadata: ImageMetadataDTO, userId: string, filePath: string) {
		await db
			.insertInto('image')
			.values({
				id: imageId,
				extension: metadata.extension,
				fileSize: metadata.fileSize,
				height: metadata.height,
				width: metadata.width,
				name: imageId,
				path: filePath
			})
			.execute();

		await db
			.updateTable('user')
			.set({
				profileImageId: imageId
			})
			.where('id', '=', userId)
			.execute();
	}

	private async updateUserProfileImage(
		imageId: string,
		newImageName: string,
		metadata: ImageMetadataDTO,
		filePath: string
	) {
		await db
			.updateTable('image')
			.set({
				name: newImageName,
				extension: metadata.extension,
				fileSize: metadata.fileSize,
				height: metadata.height,
				width: metadata.width,
				path: filePath
			})
			.where('id', '=', imageId)
			.execute();
	}
}