import {GetShareRecipientList} from '@copor/cloud/domain/Cloud/interactor/GetShareRecipientList';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

describe('Get share recipient list interactor test', () => {
	const mockRepo: jest.Mocked<ListVisibleUsersRepo> = {
		list: jest.fn()
	};

	it('lists the active users under the scope of cloud.canGetShareRecipientList', async () => {
		const users: VisibleUserDTO[] = [{id: 'user-1', firstName: 'John', lastName: 'Doe', isActive: true}];

		mockRepo.list.mockResolvedValue(users);
		const interactor = new GetShareRecipientList({filters: [], actorId: 'actor-1', limit: '20', offset: '0'}, mockRepo);

		expect(await interactor.execute()).toEqual(users);
		expect(mockRepo.list).toHaveBeenCalledWith({
			filters: [],
			actorId: 'actor-1',
			permissionType: CloudPermission.canGetShareRecipientList,
			activeOnly: true,
			limit: '20',
			offset: '0'
		});
	});
});
