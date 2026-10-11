export interface SaveNotificationDTO<TranslationData> {
	id: string,
	title: string,
	description: string,
	userId: string,
	seen: boolean,
	translationData: TranslationData;
}
