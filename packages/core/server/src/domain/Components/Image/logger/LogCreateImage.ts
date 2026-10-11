import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateImage extends TypedLogger<LogDataForCreateImage> {
	getType(): string {
		return 'createImage';
	}
}
export interface LogDataForCreateImage {
	id: string;
	name: string;
	extension: string;
	fileSize: number;
	width: number;
	height: number;
}