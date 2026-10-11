import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';


export class FakeGetUserGroupListInteractorRepo implements ListItems<GetUserGroupDTO> {
	public list(filters: ListRepoInputDTO): Promise<GetUserGroupDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'id',
					name: 'group',
					isSpecial: true
				}]
			);
		});
	}
}
