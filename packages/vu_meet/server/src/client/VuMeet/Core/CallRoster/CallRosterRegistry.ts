import {GroupCallRosterDTO} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/dto/GroupCallRosterDTO';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export enum RosterParticipantStatus {
	RINGING = 'RINGING',
	JOINED = 'JOINED',
	DECLINED = 'DECLINED',
	LEFT = 'LEFT',
	NO_ANSWER = 'NO_ANSWER'
}

export interface RosterEntry {
	chatId: string;
	memberIds: string[];
	participants: Map<string, RosterParticipantStatus>;
	createdAt: number;
	updatedAt: number;
}

// Ceiling for the stale-roster GC sweep — deliberately generous. This is a leak
// guard for crashed/force-quit clients that never send a clean END_CALL/DECLINE_CALL,
// not part of the normal teardown path (which destroys the entry immediately once no
// participant is RINGING/JOINED — see maybeDestroy).
const STALE_ROSTER_CEILING_MS = 4 * 60 * 60 * 1000;
const SWEEP_INTERVAL_MS = 60 * 1000;

class CallRosterRegistry {
	private rosters = new Map<string, RosterEntry>();

	public startCall(chatId: string, initiatorId: string, memberIds: string[]): RosterEntry {
		const participants = new Map<string, RosterParticipantStatus>();

		for (const memberId of memberIds) {
			participants.set(memberId, memberId === initiatorId ? RosterParticipantStatus.JOINED : RosterParticipantStatus.RINGING);
		}

		const entry: RosterEntry = {
			chatId,
			memberIds,
			participants,
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		this.rosters.set(chatId, entry);

		return entry;
	}

	public markJoined(chatId: string, userId: string): RosterEntry | undefined {
		return this.mutate(chatId, (entry) => entry.participants.set(userId, RosterParticipantStatus.JOINED));
	}

	public markDeclined(chatId: string, userId: string): RosterEntry | undefined {
		return this.mutate(chatId, (entry) => entry.participants.set(userId, RosterParticipantStatus.DECLINED));
	}

	public markLeft(chatId: string, userId: string): RosterEntry | undefined {
		return this.mutate(chatId, (entry) => entry.participants.set(userId, RosterParticipantStatus.LEFT));
	}

	// Only the original caller's device runs the ring-timeout timer, so this is a
	// bulk "nobody still ringing ever answered" transition rather than per-callee.
	public markAllRingingAsNoAnswer(chatId: string): RosterEntry | undefined {
		return this.mutate(chatId, (entry) => {
			for (const [userId, status] of entry.participants) {
				if (status === RosterParticipantStatus.RINGING) {
					entry.participants.set(userId, RosterParticipantStatus.NO_ANSWER);
				}
			}
		});
	}

	public get(chatId: string): RosterEntry | undefined {
		return this.rosters.get(chatId);
	}

	public delete(chatId: string): void {
		this.rosters.delete(chatId);
	}

	// Returns the entries that were swept (pre-clear) so the caller can still
	// broadcast an empty-roster signal to each entry's memberIds.
	public sweepStale(): RosterEntry[] {
		const now = Date.now();
		const swept: RosterEntry[] = [];

		for (const [chatId, entry] of this.rosters) {
			if (now - entry.updatedAt > STALE_ROSTER_CEILING_MS) {
				this.rosters.delete(chatId);
				swept.push(entry);
			}
		}

		return swept;
	}

	private mutate(chatId: string, apply: (entry: RosterEntry) => void): RosterEntry | undefined {
		const entry = this.rosters.get(chatId);

		if (!entry) return undefined;

		apply(entry);
		entry.updatedAt = Date.now();

		if (this.isDone(entry)) {
			this.rosters.delete(chatId);

			// Return a copy with an empty roster so the caller can still broadcast
			// the "call ended" signal even though the entry no longer exists.
			return {...entry, participants: new Map()};
		}

		return entry;
	}

	private isDone(entry: RosterEntry): boolean {
		for (const status of entry.participants.values()) {
			if (status === RosterParticipantStatus.RINGING || status === RosterParticipantStatus.JOINED) {
				return false;
			}
		}

		return true;
	}
}

export const callRosterRegistry = new CallRosterRegistry();

export function rosterToDTO(entry: RosterEntry): GroupCallRosterDTO {
	return {
		chatId: entry.chatId,
		totalMembers: entry.memberIds.length,
		participants: Array.from(entry.participants, ([userId, status]) => ({userId, status}))
	};
}

export function startCallRosterSweep(): void {
	setInterval(() => {
		const swept = callRosterRegistry.sweepStale();

		for (const entry of swept) {
			VuMeetWebSocket.sendGroupCallRosterUpdate(entry.memberIds, {
				chatId: entry.chatId,
				totalMembers: entry.memberIds.length,
				participants: []
			});
		}
	}, SWEEP_INTERVAL_MS);
}
