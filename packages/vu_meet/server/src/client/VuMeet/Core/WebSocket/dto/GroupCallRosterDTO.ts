export interface GroupCallRosterParticipantDTO {
	userId: string;
	status: string;
}

export interface GroupCallRosterDTO {
	chatId: string;
	totalMembers: number;
	// Empty array means the call has ended — the frontend should drop the pill.
	participants: GroupCallRosterParticipantDTO[];
}
