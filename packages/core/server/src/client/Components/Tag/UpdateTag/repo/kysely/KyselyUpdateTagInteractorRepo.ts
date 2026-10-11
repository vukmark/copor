import {SaveTagRepo} from '@copor/core/domain/Components/Tag/repository/SaveTagRepo';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateTagInteractorRepo implements SaveTagRepo {
	async save(saveDTO: SaveTagDTO): Promise<void> {
		await db
			.updateTable('tag')
			.set({
				name: saveDTO.name,
				color: saveDTO.color,
				colorSet: saveDTO.colorSet,
				description: saveDTO.description,
				isPrivate: saveDTO.isPrivate ?? true,
				actorId: saveDTO.actorId
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
