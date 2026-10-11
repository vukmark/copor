import {SaveSettingsRepo} from '@copor/core/domain/MyAccount/repository/SaveSettingsRepo';
import {SaveSettingsDTO} from '@copor/core/domain/MyAccount/interactor/dto/SaveSettingsDTO';
import {UpdateSettings} from '@copor/core/domain/MyAccount/interactor/UpdateSettings';

describe('update user settings tests', () => {
	let mockRepo: jest.Mocked<SaveSettingsRepo>;
	let inputDTO: SaveSettingsDTO;
	let updateSettings: UpdateSettings;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn(),
			getNewId: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			darkMode: false,
			expertMode: true,
			waiAria: true,
			avatar: 'some-url',
			actorId: 'actor-id'
		};
		updateSettings = new UpdateSettings(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateSettings.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
