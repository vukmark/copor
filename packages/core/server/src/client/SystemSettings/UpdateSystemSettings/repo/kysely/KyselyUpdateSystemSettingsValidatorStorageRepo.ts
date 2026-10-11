import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';

export class KyselyUpdateSystemSettingsValidatorStorageRepo implements ValidateUpdateSystemSettingsRepo {
	isInvalidSystemSettings(systemSettingKey: string): Promise<boolean> {
		// @TODO implement real validation of SMTP details, validate with mailer can connect to server
		return Promise.resolve(false);
	}
}