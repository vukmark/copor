import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';

export class KyselyUpdateTimeZoneSystemSettingsValidatorStorageRepo implements ValidateUpdateSystemSettingsRepo {
	isInvalidSystemSettings(timeZone: string | undefined): Promise<boolean> {
		const isValid = timeZone !== undefined && Intl.supportedValuesOf('timeZone').includes(timeZone);

		return Promise.resolve(!isValid);
	}
}
