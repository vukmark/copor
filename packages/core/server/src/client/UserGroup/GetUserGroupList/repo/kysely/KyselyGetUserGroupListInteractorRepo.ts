import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetUserGroupListInteractorRepo implements ListItems<GetUserGroupDTO> {
	public async list(filters: ListRepoInputDTO): Promise<GetUserGroupDTO[]> {
		const results = await db
			.selectFrom('userGroup')
			.select([
				'id',
				'name',
				'isSpecial'
			])
			.execute();

		return results;
	}
}
