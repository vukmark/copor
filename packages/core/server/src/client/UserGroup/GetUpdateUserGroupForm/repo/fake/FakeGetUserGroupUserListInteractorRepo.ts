import {GetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/GetUserGroupUserListRepo';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';
import {ListItemsByIdDTO} from '@copor/core/domain/Core/Interactors/ListItemsByIdUseCase';

export class FakeGetUserGroupUserListInteractorRepo implements GetUserGroupUserListRepo {
	list(input: ListItemsByIdDTO): Promise<GetUserGroupUserListDTO[]> {
		return Promise.resolve([{
			id: 'id',
			firstName: 'name',
			lastName: 's',
			imageName: 'imageName',
			imageExtension: 'jpg'
		}]);
	}
}