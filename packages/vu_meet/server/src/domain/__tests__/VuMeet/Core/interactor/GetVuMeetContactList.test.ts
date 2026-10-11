import {GetVuMeetContactList} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetVuMeetContactList';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

describe('Get VuMeet contact list interactor test', () => {
	const mockRepo: jest.Mocked<ListVisibleUsersRepo> = {
		list: jest.fn()
	};
	const users: VisibleUserDTO[] = [
		{id: 'some-id-1', firstName: 'Mika', lastName: 'Schumacher', imageName: '123', imageExtension: 'jpg', isActive: true}
	];

	it('lists active users under the scope of vu_meet.canGetVuMeetContactList', async () => {
		mockRepo.list.mockResolvedValue(users);
		const interactor = new GetVuMeetContactList({filters: [], actorId: 'userId', limit: '20', offset: '0'}, mockRepo);

		expect(await interactor.execute()).toEqual(users);
		expect(mockRepo.list).toHaveBeenCalledWith({
			filters: [],
			actorId: 'userId',
			permissionType: VuMeetPermission.canGetVuMeetContactList,
			activeOnly: true,
			limit: '20',
			offset: '0'
		});
	});
});
