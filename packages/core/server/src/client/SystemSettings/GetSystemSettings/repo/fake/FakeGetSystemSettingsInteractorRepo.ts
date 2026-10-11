import {GetSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/GetSystemSettingsRepo';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {GetGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetGlobalSystemSettingsDTO';
import {GetTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetTimeZoneSystemSettingsDTO';

export class FakeGetSystemSettingsInteractorRepo<T> implements GetSystemSettingsRepo<T> {
	load(type: SystemSettingsType): Promise<T> {
		if (type === SystemSettingsType.SMTP)
			return Promise.resolve({
				smtpPort: 483,
				smtpHost: '',
				smtpPassword: '',
				smtpEmail: '',
				smtpConnectionSecurity: SmtpConnectionSecurity.sslTls,
				smtpAuthMethod: SmtpAuthMethod.normalPassword
			} as GetSMTPSystemSettingsDTO as T);

		if (type === SystemSettingsType.GLOBAL)
			return Promise.resolve({
				name: '',
				postalCode: ''
			} as GetGlobalSystemSettingsDTO as T);

		if (type === SystemSettingsType.TIME_ZONE)
			return Promise.resolve({
				timeZone: 'Europe/Berlin'
			} as GetTimeZoneSystemSettingsDTO as T);
		return Promise.resolve(undefined as T);
	}
}