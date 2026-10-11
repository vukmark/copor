import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {SmtpAuthMethod, SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

export class LogUpdateSMTPSystemSettings extends TypedLogger<LogDataForUpdateSMTPSystemSettings> {
	public getType(): string {
		return 'updateSMTPSystemSettings';
	}
}

export interface LogDataForUpdateSMTPSystemSettings {
	smtpPort: number;
	smtpHost: string;
	smtpPassword: string;
	smtpEmail: string;
	smtpConnectionSecurity: SmtpConnectionSecurity;
	smtpAuthMethod: SmtpAuthMethod;
}