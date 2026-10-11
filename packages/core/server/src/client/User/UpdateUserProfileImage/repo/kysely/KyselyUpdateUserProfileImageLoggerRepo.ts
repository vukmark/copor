import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateUserProfileImage} from '@copor/core/domain/User/logger/LogUpdateUserProfileImage';

export class KyselyUpdateUserProfileImageLoggerRepo implements
	LogRepository<LogDataForUpdateUserProfileImage> {
	save(logDTO: LogForSave<LogDataForUpdateUserProfileImage>): Promise<void> {
		return Promise.resolve();
	}
}
