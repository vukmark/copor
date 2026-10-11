export interface GetGlobalSystemSettingsDTO {
	name: string;
	postalCode: string;
	// Missing in settings files written before this field existed; treat as false.
	allowSelfRegistration?: boolean;
}
