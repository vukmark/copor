import {TypingStatus} from '@copor/core/domain/Core/enum/TypingStatus';

export interface SendTypingStatusDTO {
	userId: string;
	chatId: string;
	status: TypingStatus;
}
