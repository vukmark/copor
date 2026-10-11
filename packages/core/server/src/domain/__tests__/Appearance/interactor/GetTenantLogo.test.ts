import {GetTenantLogoRepo} from '@copor/core/domain/Appearance/repository/GetTenantLogoRepo';
import {GetTenantLogo} from '@copor/core/domain/Appearance/interactor/GetTenantLogo';
import {GetTenantLogoDTO} from '@copor/core/domain/Appearance/interactor/dto/GetTenantLogoDTO';

describe('test get tenant logo', () => {
	const mockRepo: jest.Mocked<GetTenantLogoRepo> = {
		load: jest.fn()
	};

	const mockedReturnTenantLogo: GetTenantLogoDTO = {
		id: 'unique-id',
		url: 'url'
	};
	const getUserGroup = new GetTenantLogo('unique-id', mockRepo);

	it('return tenant logo', async () => {
		mockRepo.load.mockResolvedValue(mockedReturnTenantLogo);

		expect(await getUserGroup.execute()).toEqual(mockedReturnTenantLogo);
		expect(mockRepo.load).toHaveBeenCalledWith('unique-id');
	});
});
