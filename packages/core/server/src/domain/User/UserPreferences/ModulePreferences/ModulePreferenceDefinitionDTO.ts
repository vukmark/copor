// A per-user on/off setting a module adds (e.g. its push toggle). Stored in
// core's `user_module_preference`; a user without a stored value gets the
// default.
export interface ModulePreferenceDefinitionDTO {
	// `<module>.<name>`, e.g. `vu_meet.messagePushNotifications`.
	key: string;
	default: boolean;
}
