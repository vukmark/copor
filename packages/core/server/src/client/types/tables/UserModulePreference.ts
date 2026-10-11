// One module preference a user changed from its default
// (ModulePreferenceRegistry); the key is `<module>.<name>`.
export interface UserModulePreference {
	userId: string;
	preferenceKey: string;
	value: boolean;
}
