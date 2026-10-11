import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateUserGroupInteractorRepo implements SaveItem<SaveUserGroupDTO> {
	async save(saveDTO: SaveUserGroupDTO): Promise<void> {
		if (saveDTO.name)
			await db
				.updateTable('userGroup')
				.set({
					name: saveDTO.name
				})
				.where('id', '=', saveDTO.id)
				.execute();
	}
}