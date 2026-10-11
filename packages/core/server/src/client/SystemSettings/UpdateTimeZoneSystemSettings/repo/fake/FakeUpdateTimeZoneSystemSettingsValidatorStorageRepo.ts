import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';

export class FakeUpdateTimeZoneSystemSettingsValidatorStorageRepo implements ValidateUpdateSystemSettingsRepo {
	isInvalidSystemSettings(systemSettingId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
