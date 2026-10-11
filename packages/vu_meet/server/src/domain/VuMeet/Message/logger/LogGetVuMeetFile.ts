import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetVuMeetFile extends TypedLogger<LogDataForGetVuMeetFile> {
	public getType(): string {
		return 'getVuMeetFile';
	}
}

export interface LogDataForGetVuMeetFile {
	messageId: string;
}