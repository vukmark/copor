import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteUserProfileImage extends TypedLogger<LogDataForDeleteUserProfileImage> {
	public getType(): string {
		return 'deleteUserProfileImage';
	}
}

export interface LogDataForDeleteUserProfileImage {
	userId: string
}
