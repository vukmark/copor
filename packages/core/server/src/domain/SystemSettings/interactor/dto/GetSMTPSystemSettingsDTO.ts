export enum SmtpConnectionSecurity {
	none = 'SMTP_CONNECTION_SECURITY_NONE',
	starttls = 'SMTP_CONNECTION_SECURITY_STARTTLS',
	sslTls = 'SMTP_CONNECTION_SECURITY_SSL_TLS'
}

export enum SmtpAuthMethod {
	none = 'SMTP_AUTH_METHOD_NONE',
	normalPassword = 'SMTP_AUTH_METHOD_NORMAL_PASSWORD'
}

export interface GetSMTPSystemSettingsDTO {
	smtpPort: number;
	smtpHost: string;
	smtpPassword: string;
	smtpEmail: string;
	smtpConnectionSecurity: SmtpConnectionSecurity;
	smtpAuthMethod: SmtpAuthMethod;
}
