import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

export interface GetFileListDTO {
	id: string;
	sharingType: SharingType;
	path: string;
	name: string;
	creatorId: string;
	creatorFirstName: string;
	creatorLastName: string;
	createdAt: Date;
	size: number;
	groupId?: string;
	groupName?: string;
	targetUserId?: string;
	targetUserFirstName?: string;
	targetUserLastName?: string;
	description?: string
}
