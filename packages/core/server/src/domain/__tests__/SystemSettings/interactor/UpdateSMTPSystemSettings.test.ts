import {UpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/UpdateSystemSettingsRepo';
import {SaveSMTPSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSMTPSystemSettingsDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {SmtpAuthMethod, SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

describe('update System Settings tests', () => {
	let mockRepo: jest.Mocked<UpdateSystemSettingsRepo<SaveSMTPSystemSettingsDTO>>;
	let inputDTO: SaveSystemSettingsDTO<SaveSMTPSystemSettingsDTO>;
	let interactor: UpdateSystemSettings<SaveSMTPSystemSettingsDTO>;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			type: SystemSettingsType.SMTP,
			settings: {
				smtpEmail: 'smtpEmail',
				smtpHost: 'smtpHost',
				smtpConnectionSecurity: SmtpConnectionSecurity.starttls,
				smtpAuthMethod: SmtpAuthMethod.normalPassword,
				smtpPassword: 'smtpPassword',
				smtpPort: 0
			}
		};
		interactor = new UpdateSystemSettings(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await interactor.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
