export interface MarkAllNotificationsAsReadRepo {
	markAllAsRead(userId: string): Promise<void>;
}