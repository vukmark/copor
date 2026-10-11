import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetFile extends TypedLogger<LogDataForGetFile> {
	public getType(): string {
		return 'getFile';
	}
}

export interface LogDataForGetFile {
	fileId: string;
}