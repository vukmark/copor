import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForUpdateImage {
	id: string,
	name: string,
	extension: string,
	fileSize: number,
	width: number,
	height: number,
	path: string
}

export class LogUpdateImage extends TypedLogger<LogDataForUpdateImage> {
	public getType(): string {
		return 'updateImage';
	}
}