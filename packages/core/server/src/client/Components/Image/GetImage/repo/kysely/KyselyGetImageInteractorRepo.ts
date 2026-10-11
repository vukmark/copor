import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetImageInteractorRepo implements GetItem<GetImageDTO> {
	async load(id: string): Promise<GetImageDTO> {
		const image = await db
			.selectFrom('image')
			.select([
				'id',
				'name',
				'path',
				'width',
				'height',
				'fileSize',
				'extension'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!image) {
			throw new Error(`Image with ID ${id} not found`);
		}

		return {
			id: image.id,
			name: image.name ?? '',
			path: image.path ?? '',
			width: image.width,
			height: image.height,
			fileSize: image.fileSize,
			extension: image.extension ?? ''
		};
	}
}
