export interface IsInvalidNativeLanguageRepo {
	isInvalidNativeLanguage(languageId: string | undefined): Promise<boolean>;
}
