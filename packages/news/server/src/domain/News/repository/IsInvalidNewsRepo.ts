export interface IsInvalidNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean>;
}