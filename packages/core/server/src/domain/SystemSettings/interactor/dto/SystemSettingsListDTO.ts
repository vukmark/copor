export enum SystemSettingsType {
	GLOBAL = 'global',
	SMTP = 'smtp',
	DISPLAY = 'display',
	WORKFLOW = 'workflow',
	NOTIFIER = 'notifier',
	PASSWORD = 'password',
	SMTP_TEST = 'smtp-test',
	TIME_ZONE = 'time-zone'
}

export interface SystemSettingsListDTO {
	type: keyof typeof SystemSettingsType;
	url: SystemSettingsType;
}