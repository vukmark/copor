export interface ValidateUpdateSystemSettingsDTO {
	actorId: string;
	timeZone?: string;
	smtpConnectionSecurity?: string;
	smtpAuthMethod?: string;
}