import {GetContactList} from '@copor/contacts/domain/Contacts/interactor/GetContactList';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

describe('Get contact list interactor test', () => {
	const mockRepo: jest.Mocked<ListVisibleUsersRepo> = {
		list: jest.fn()
	};

	const expectedResponse: VisibleUserDTO[] = [
		{id: 'user-1', firstName: 'John', lastName: 'Doe', isActive: true},
		{id: 'user-2', firstName: 'Jane', lastName: 'Smith', imageName: 'jane', imageExtension: 'png', isActive: false}
	];
	const filters = [{name: FilterNameValues.SEARCH.toString(), values: ['do']}];

	beforeEach(() => {
		mockRepo.list.mockReset();
		mockRepo.list.mockResolvedValue(expectedResponse);
	});

	it('returns the contacts the repository lists', async () => {
		const getContactList = new GetContactList({filters, actorId: 'actor-1', limit: '20', offset: '0'}, mockRepo);

		expect(await getContactList.execute()).toEqual(expectedResponse);
	});

	it('passes the actor and canGetContactList to the repository so it can apply the scope', async () => {
		const getContactList = new GetContactList({filters, actorId: 'actor-1', limit: '20', offset: '40'}, mockRepo);

		await getContactList.execute();

		expect(mockRepo.list).toHaveBeenCalledWith({
			filters,
			actorId: 'actor-1',
			permissionType: ContactsPermission.canGetContactList,
			activeOnly: false,
			limit: '20',
			offset: '40'
		});
	});
});
