// A permission key, `<module>.<name>` (e.g. `vu_meet.canGetChatInfo`). Core's
// permissions are in CorePermission, each module's in its own
// `<Feature>Permission` enum; PermissionRegistry holds the definitions of the
// modules the app includes. Keys are stored as-is in the database, so a key
// must not change once data exists.
export type PermissionType = `${string}.${string}`;
