import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetSystemSettingsList} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettingsList';
import {SystemSettingsListDTO, SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

describe('Get list of activity types', () => {
	const mockRepo: jest.Mocked<ListItems<SystemSettingsListDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: SystemSettingsListDTO[] = [{
		type: 'SMTP',
		url: SystemSettingsType.SMTP
	}];
	const getSystemSettingsList: GetSystemSettingsList = new GetSystemSettingsList([], mockRepo);

	it('Should list all SystemSettings', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getSystemSettingsList.execute()).toEqual(expectedResponse);
	});
});
