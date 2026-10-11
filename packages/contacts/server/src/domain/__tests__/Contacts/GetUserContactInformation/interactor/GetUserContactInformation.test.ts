import {
	GetUserContactInformationRepo
} from '@copor/contacts/domain/Contacts/GetUserContactInformation/repository/GetUserContactInformationRepo';
import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetUserContactInformation} from '@copor/contacts/domain/Contacts/GetUserContactInformation/interactor/GetUserContactInformation';

describe('get User Contact Information', () => {
	const mockRepo: jest.Mocked<GetUserContactInformationRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetUserContactInformationDTO = {
		email: 'email',
		roleName: 'roleName',
		roleType: RoleType.USER,
		userId: 'userId',
		username: 'username'
	};

	beforeEach(() => {
		mockRepo.load.mockResolvedValue(expectedResponse);
	});
	it('should get user account information', async () => {
		const getUserContactInformation = new GetUserContactInformation('userId', mockRepo);

		expect(await getUserContactInformation.execute()).toEqual(expectedResponse);
	});
});