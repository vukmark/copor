import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateUserProfileImage extends TypedLogger<LogDataForUpdateUserProfileImage> {
	public getType(): string {
		return 'updateUserProfileImage';
	}
}

export interface LogDataForUpdateUserProfileImage {
	userId: string
}
