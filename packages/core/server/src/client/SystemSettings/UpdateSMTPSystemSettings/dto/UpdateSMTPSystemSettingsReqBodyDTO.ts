import {SmtpAuthMethod, SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

export interface UpdateSMTPSystemSettingsReqBodyDTO {
	smtpPort: number;
	smtpHost: string;
	smtpPassword: string;
	smtpEmail: string;
	smtpConnectionSecurity: SmtpConnectionSecurity;
	smtpAuthMethod: SmtpAuthMethod;
}