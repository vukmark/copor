import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForDeleteImage {
	imageId: string;
}

export class LogDeleteImage extends TypedLogger<LogDataForDeleteImage> {
	getType(): string {
		return 'deleteImage';
	}
}