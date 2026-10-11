import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetRoleListInteractorRepo implements ListItems<GetRoleDTO> {
	public list(input: ListRepoInputDTO): Promise<GetRoleDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'someId1',
					type: RoleType.USER,
					name: 'some name'
				},
				{
					id: 'someId2',
					type: RoleType.USER,
					name: 'some name 2'
				}
			]);
		});
	}
}
