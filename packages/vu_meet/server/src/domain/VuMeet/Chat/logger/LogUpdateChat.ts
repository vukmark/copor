import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateChat extends TypedLogger<LogDataForUpdateChat> {
	public getType(): string {
		return 'updateChat';
	}
}

export interface LogDataForUpdateChat {
	chatId: string;
	name: string;
	userList: string[];
}