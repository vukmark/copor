// Unread counts per badge, keyed by what the frontend reads (e.g. `vuMeet`).
// Each module contributes its own through `notificationCounters` on its
// descriptor; a missing key means 0.
export type GetNotificationCounterDTO = Record<string, number>;
