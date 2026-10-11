import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

export interface ValidateCreateFileDTO {
	actorId: string;
	buffer: Buffer;
	sharingType: SharingType;
	sharingParticipants: {
		userGroupId?: string;
		userId?: string;
	}
}
