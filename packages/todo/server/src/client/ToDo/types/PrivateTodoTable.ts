export interface PrivateTodoTable {
	id: string;
	actorId: string;
	deadline: Date | null;
	isDisplayedInCalendar: boolean;
	isPinned: boolean;
	priority: string;
	progress: string | null;
	scheduledTime: Date | null;
	title: string;
}
