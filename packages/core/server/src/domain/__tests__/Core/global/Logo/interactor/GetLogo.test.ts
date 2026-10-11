import {GetLogo} from '@copor/core/domain/Core/global/Logo/interactor/GetLogo';
import {GetLogoRepo} from '@copor/core/domain/Core/global/Logo/repository/interactor/GetLogoRepo';
import {GetLogoDTO} from '@copor/core/domain/Core/global/Logo/interactor/dto/GetLogoDTO';

describe('get logo interactor tests', () => {
	const mockRepo: jest.Mocked<GetLogoRepo> = {
		load: jest.fn()
	};
	const expectedResponse: GetLogoDTO = {
		fileName: 'fileName'
	};

	it('should return expected response', async () => {
		const getLogo: GetLogo = new GetLogo(undefined, mockRepo);

		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getLogo.execute()).toEqual(expectedResponse);
	});
});
