import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';


export class FakeGetUserGroupTreeInteractorRepo implements ListItems<GetUserGroupTreeDTO> {
	public list(filters: ListRepoInputDTO): Promise<GetUserGroupTreeDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'id',
					name: 'name',
					canEditName: true,
					canEditMembers: true,
					canCreateChildren: true,
					children: []
				}]
			);
		});
	}
}
