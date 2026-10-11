import {SaveRoleRepo} from '@copor/core/domain/Components/Role/repository/SaveRoleRepo';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateRoleInteractorRepo implements SaveRoleRepo {
	async save(saveDTO: SaveRoleDTO): Promise<void> {
		await db
			.updateTable('role')
			.set({
				id: saveDTO.id,
				name: saveDTO.name,
				type: saveDTO.type
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
