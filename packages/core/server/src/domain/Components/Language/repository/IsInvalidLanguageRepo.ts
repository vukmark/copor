export interface IsInvalidLanguageRepo {
	isInvalidLanguage(languageId: string | undefined): Promise<boolean>;
}
