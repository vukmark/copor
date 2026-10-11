export interface IsInvalidSystemSettingsRepo {
	isInvalidSystemSettings(systemSettingId: string | undefined): Promise<boolean>;
}