import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class KyselyCreateImageInteractorRepo implements SaveItem<SaveImageDTO> {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	async save(saveDTO: SaveImageDTO): Promise<void> {
		const metadata = await ImageHelper.getImageMetadata(saveDTO.image);
		const uploadFolder = this.appContext.envVariables!.IMAGE_UPLOAD_FOLDER;

		const filePath = await ImageHelper.saveImageFile(uploadFolder, saveDTO.name, metadata.extension, saveDTO.image);

		await db
			.insertInto('image')
			.values({
				id: saveDTO.id,
				extension: metadata.extension,
				fileSize: metadata.fileSize,
				height: metadata.height,
				width: metadata.width,
				name: saveDTO.name,
				path: filePath
			})
			.execute();
	}
}
