import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetImage {
	image: string;
}

export class LogGetImage extends TypedLogger<LogDataForGetImage> {
	public getType(): string {
		return 'getImage';
	}
}