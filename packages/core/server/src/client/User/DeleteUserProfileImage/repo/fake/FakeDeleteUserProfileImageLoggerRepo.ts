import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteUserProfileImage} from '@copor/core/domain/User/logger/LogDeleteUserProfileImage';

export class FakeDeleteUserProfileImageLoggerRepo implements LogRepository<LogDataForDeleteUserProfileImage> {
	save(logDTO: LogForSave<LogDataForDeleteUserProfileImage>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
