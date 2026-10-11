import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetRoleInteractorRepo implements GetItem<GetRoleDTO> {
	async load(id: string): Promise<GetRoleDTO> {
		const result = await db
			.selectFrom('role')
			.select(['id', 'name', 'type'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Role with id ${id} not found`);
		}

		return result;
	}
}
