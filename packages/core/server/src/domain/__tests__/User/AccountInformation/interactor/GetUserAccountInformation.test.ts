import {
	GetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';
import {
	GetUserAccountInformationForDisplayRepo
} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationForDisplayRepo';
import {
	GetUserAccountInformationForDisplay
} from '@copor/core/domain/User/AccountInformation/interactor/GetUserAccountInformationForDisplay';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('getUser contact information interactor tests', () => {
	const mockRepo: jest.Mocked<GetUserAccountInformationForDisplayRepo> = {
		load: jest.fn()
	};
	const expectedResponse: GetUserAccountInformationForDisplayDTO = {
		id: 'uid',
		firstName: 'name',
		lastName: 'name',
		userName: 'name',
		registrationDate: new Date(),
		address: {
			addressId: 'aId',
			streetAddress: 'streetAddress',
			state: {
				id: 'sid',
				name: 'sname',
				code: 'scode',
				countryId: 'cid',
				publishStatus: PublishStatus.unpublished
			},
			postalCode: 'postalCode'
		},
		roleType: RoleType.USER,
		citizenship: 'cz',
		email: 'mail',
		lastVisitedDate: new Date(10, 10, 2020)
	};

	beforeEach(() => {
		mockRepo.load.mockResolvedValue(expectedResponse);
	});
	it('should get user account information', async () => {
		const getUserAccountInformation = new GetUserAccountInformationForDisplay('userId', mockRepo);

		expect(await getUserAccountInformation.execute()).toEqual(expectedResponse);
	});
});
