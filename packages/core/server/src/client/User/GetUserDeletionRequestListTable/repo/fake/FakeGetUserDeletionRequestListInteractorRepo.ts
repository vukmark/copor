import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserDeletionRequestDTO} from '@copor/core/domain/User/interactor/dto/GetUserDeletionRequestDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetUserDeletionRequestListInteractorRepo implements ListItems<GetUserDeletionRequestDTO> {
	public list(input: ListRepoInputDTO): Promise<GetUserDeletionRequestDTO[]> {
		return Promise.resolve([
			{
				id: '1',
				userFirstName: 'Max',
				userLastName: 'Mustermann',
				username: 'max.mustermann',
				userRoleType: 'USER'
			}
		]);
	}
}
