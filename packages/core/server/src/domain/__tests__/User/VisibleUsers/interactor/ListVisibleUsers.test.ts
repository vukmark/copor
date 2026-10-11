import {ListVisibleUsers} from '@copor/core/domain/User/VisibleUsers/interactor/ListVisibleUsers';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {FilterNameValues} from '@copor/core/domain/Core/enum/FilterNameValues';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

// A module's user picker: the same core query under the module's own permission.
class ListSampleRecipients extends ListVisibleUsers {
	protected permissionType: PermissionType = 'sample.canPickRecipient';
}

class ListSampleActiveRecipients extends ListVisibleUsers {
	protected permissionType: PermissionType = 'sample.canPickRecipient';
	protected activeOnly = true;
}

describe('List visible users interactor test', () => {
	const mockRepo: jest.Mocked<ListVisibleUsersRepo> = {
		list: jest.fn()
	};

	const expectedResponse: VisibleUserDTO[] = [
		{id: 'user-1', firstName: 'John', lastName: 'Doe', isActive: true}
	];
	const filters = [{name: FilterNameValues.SEARCH.toString(), values: ['jo']}];

	beforeEach(() => {
		mockRepo.list.mockReset();
		mockRepo.list.mockResolvedValue(expectedResponse);
	});

	it('returns the users the repository lists', async () => {
		const interactor = new ListSampleRecipients({filters, actorId: 'actor-1'}, mockRepo);

		expect(await interactor.execute()).toEqual(expectedResponse);
	});

	it('passes the subclass permission to the repository so the scope comes from it', async () => {
		const interactor = new ListSampleRecipients({filters, actorId: 'actor-1', limit: '20', offset: '20'}, mockRepo);

		await interactor.execute();

		expect(mockRepo.list).toHaveBeenCalledWith({
			filters,
			actorId: 'actor-1',
			permissionType: 'sample.canPickRecipient',
			activeOnly: false,
			limit: '20',
			offset: '20'
		});
	});

	it('asks for active users only when the subclass says so', async () => {
		const interactor = new ListSampleActiveRecipients({filters, actorId: 'actor-1'}, mockRepo);

		await interactor.execute();

		expect(mockRepo.list).toHaveBeenCalledWith(expect.objectContaining({activeOnly: true}));
	});
});
