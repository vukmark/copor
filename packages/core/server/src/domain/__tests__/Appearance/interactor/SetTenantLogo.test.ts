import {SetTenantLogo} from '@copor/core/domain/Appearance/interactor/SetTenantLogo';
import {SetTenantLogoDTO} from '@copor/core/domain/Appearance/interactor/dto/SetTenantLogoDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

describe('Set Tenant Logo Test', () => {
	let setTenantLogo: SetTenantLogo;
	let mockRepo: jest.Mocked<SaveItem<SetTenantLogoDTO>>;
	let inputDTO: SetTenantLogoDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			tenantLogoId: 'tenant-logo-id',
			url: 'url',
			actorId: 'actor-Id'
		};
		setTenantLogo = new SetTenantLogo(inputDTO, mockRepo);
	});

	it('should store the tenant logo', async () => {
		await setTenantLogo.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});


