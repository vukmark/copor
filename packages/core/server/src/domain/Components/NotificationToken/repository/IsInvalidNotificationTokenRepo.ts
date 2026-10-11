export interface IsInvalidNotificationTokenRepo {
	isInvalidNotificationToken(notificationTokenId: string | undefined): Promise<boolean>;
}
