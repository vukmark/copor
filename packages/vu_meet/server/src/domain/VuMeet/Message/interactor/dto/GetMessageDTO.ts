import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export interface GetMessageDTO {
	id: string;
	content: string;
	type: MessageContentType;
	senderId: string;
	senderFirstName: string;
	senderLastName: string;
	senderPictureName?: string;
	senderPictureExtension?: string;
	seen: boolean;
	createdAt: Date;
	isPrivate: boolean;
}
