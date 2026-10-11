import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateFile extends TypedLogger<LogDataForCreateFile> {
	public getType(): string {
		return 'createFile';
	}
}

export interface LogDataForCreateFile {
	fileId: string;
}