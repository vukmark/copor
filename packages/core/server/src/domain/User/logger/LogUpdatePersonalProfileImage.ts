import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdatePersonalProfileImage extends TypedLogger<LogDataForUpdatePersonalProfileImage> {
	public getType(): string {
		return 'updatePersonalProfileImage';
	}
}

export interface LogDataForUpdatePersonalProfileImage {
	userId: string
}