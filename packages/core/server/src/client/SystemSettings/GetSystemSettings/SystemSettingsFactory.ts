import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {SystemFileHelper} from '@copor/core/client/Core/Helpers/SystemFileHelper';
import {readFile} from 'node:fs/promises';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetGlobalSystemSettingsDTO';

export class SystemSettingsFactory {
	static async getSettings<T>(type: SystemSettingsType) : Promise<T> {
		if (type === SystemSettingsType.SMTP)
			return this.getSMTP() as Promise<T>;

		try {
			const content = await readFile(SystemFileHelper.settingsPath(type), 'utf-8');

			return JSON.parse(content) as T;
		} catch (err) {
			throw new Error('Failed to load system settings JSON');
		}
	}
	static async getSMTP() : Promise<GetSMTPSystemSettingsDTO> {
		try {
			const content = await readFile(SystemFileHelper.settingsPath(SystemSettingsType.SMTP), 'utf-8');

			return this.normalizeSmtpSettings(JSON.parse(content));
		} catch (err) {
			throw new Error('Failed to load system settings JSON');
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static normalizeSmtpSettings(raw: any): GetSMTPSystemSettingsDTO {
		if (raw.smtpConnectionSecurity === undefined) {
			raw.smtpConnectionSecurity = raw.smtpIsSecure
				? SmtpConnectionSecurity.sslTls
				: SmtpConnectionSecurity.starttls;
		}

		if (raw.smtpAuthMethod === undefined)
			raw.smtpAuthMethod = SmtpAuthMethod.normalPassword;

		return raw as GetSMTPSystemSettingsDTO;
	}

	static async getGlobal() : Promise<GetGlobalSystemSettingsDTO> {
		try {
			const content = await readFile(SystemFileHelper.settingsPath(SystemSettingsType.GLOBAL), 'utf-8');

			return JSON.parse(content) as GetGlobalSystemSettingsDTO;
		} catch (err) {
			throw new Error('Failed to load system settings JSON');
		}
	}
}