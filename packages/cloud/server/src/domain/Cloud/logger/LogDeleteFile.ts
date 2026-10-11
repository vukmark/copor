import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteFile extends TypedLogger<LogDataForDeleteFile> {
	public getType(): string {
		return 'deleteFile';
	}
}

export interface LogDataForDeleteFile {
	fileId: string;
}