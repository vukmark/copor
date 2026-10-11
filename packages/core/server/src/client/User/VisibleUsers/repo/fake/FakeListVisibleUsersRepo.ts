import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';

export class FakeListVisibleUsersRepo implements ListVisibleUsersRepo {
	public list(): Promise<VisibleUserDTO[]> {
		return Promise.resolve([
			{id: 'contact-1', firstName: 'Emma', lastName: 'Johnson', isActive: true},
			{id: 'contact-2', firstName: 'Liam', lastName: 'Becker', isActive: false}
		]);
	}
}
