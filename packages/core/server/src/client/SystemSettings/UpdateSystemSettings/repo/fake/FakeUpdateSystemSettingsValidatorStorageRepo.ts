import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';

export class FakeUpdateSystemSettingsValidatorStorageRepo implements ValidateUpdateSystemSettingsRepo {
	isInvalidSystemSettings(systemSettingId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
