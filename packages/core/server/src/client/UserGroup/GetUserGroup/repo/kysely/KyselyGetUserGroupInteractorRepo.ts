import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';

export class KyselyGetUserGroupInteractorRepo implements GetItem<GetUserGroupDTO> {
	async load(id: string): Promise<GetUserGroupDTO> {
		const result = await db
			.selectFrom('userGroup')
			.select([
				'id',
				'name',
				'isSpecial'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`UserGroup with id ${id} not found`);
		}

		return result;
	}
}
