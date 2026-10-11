export enum SharingType {
	USER_GROUP = 'USER_GROUP',
	PRIVATE = 'PRIVATE',
	/**
	 * Individual (non-group) file sharing: a file placed in one specific
	 * user's Public folder. `sharingParticipants.userId` is the folder
	 * owner (recipient); `actorId` / `cloud_file.created_by` is the file
	 * owner (uploader). The two can differ.
	 */
	PUBLIC = 'PUBLIC'
}

export interface SaveFileDTO {
	id: string;
	overwrite?: boolean;
	actorId: string;
	buffer: Buffer;
	sharingType: SharingType;
	name: string;
	description?: string;
	path: string;
	sharingParticipants: {
		userGroupId?: string;
		userId?: string;
	}
}
