import {TypingStatus} from '@copor/core/domain/Core/enum/TypingStatus';

export interface TypingStatusMessageDTO {
	chatId: string;
	userId: string;
	typingStatus: TypingStatus;
	userName: string;
}