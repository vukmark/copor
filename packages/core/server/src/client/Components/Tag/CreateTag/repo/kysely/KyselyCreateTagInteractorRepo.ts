import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {db} from '@copor/core/client/AppDataSource';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateTagInteractorRepo implements SaveItem<SaveTagDTO> {
	async save(saveDTO: SaveTagDTO): Promise<void> {
		await db
			.insertInto('tag')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				color: saveDTO.color,
				colorSet: saveDTO.colorSet,
				description: saveDTO.description ?? null,
				isPrivate: saveDTO.isPrivate ?? true,
				actorId: saveDTO.actorId,
				...TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}