import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetUserListInteractorRepo implements ListItems<GetUserDTO> {
	public list(input: ListRepoInputDTO): Promise<GetUserDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: '1',
					firstName: 'Max',
					lastName: 'Mustermann',
					userName: 'max.mustermann',
					imageName: '',
					role: 'USER',
					isDefaultRole: true,
					email: 'max.mustermann@example.com',
					isActive: true,
					groupList: {
						userGroupList: [{name: 'Grupa1'}]
					}
				},
				{
					id: '2',
					firstName: 'Anna',
					lastName: 'Schmidt',
					userName: 'anna.schmidt',
					imageName: '',
					role: 'ADMIN',
					email: 'anna.schmidt@example.com',
					isDefaultRole: true,
					isActive: true,
					groupList: {
						userGroupList: [
							{name: 'Grupa1'},
							{name: 'Grupa2'},
							{name: 'Grupa3'},
							{name: 'Grupa4'}
						]
					}
				},
				{
					id: '3',
					firstName: 'Hans',
					lastName: 'Müller',
					userName: 'hans.müller',
					imageName: '',
					role: 'USER',
					email: 'hans.mueller@example.com',
					isDefaultRole: true,
					isActive: true,
					groupList: {
						userGroupList: [{name: 'group1'}, {name: 'group2'}]
					}
				},
				{
					id: '4',
					firstName: 'Maria',
					lastName: 'Weber',
					userName: 'maria.weber',
					imageName: '',
					role: 'USER',
					email: 'maria.weber@example.com',
					isDefaultRole: true,
					isActive: true,
					groupList: {userGroupList: []}
				}
			]);
		});
	}
}
