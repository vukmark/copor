import {GetUserFullNameRepo} from '@copor/core/domain/User/repository/GetUserFullNameRepo';
import {GetUserFullName} from '@copor/core/domain/User/GetFullName/interactor/GetUserFullName';

describe('get user full name', () => {
	const mockRepo: jest.Mocked<GetUserFullNameRepo> = {
		load: jest.fn()
	};
	const expectedResponse: string = 'unique-id';

	beforeEach(() => {
		mockRepo.load.mockResolvedValue(expectedResponse);
	});
	it('should get user full name', async () => {
		const getUserFullName = new GetUserFullName('unique-id', mockRepo);

		expect(await getUserFullName.execute()).toEqual(expectedResponse);
	});
});