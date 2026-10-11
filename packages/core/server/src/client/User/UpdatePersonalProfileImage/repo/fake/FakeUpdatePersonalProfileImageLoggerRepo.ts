import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdatePersonalProfileImage} from '@copor/core/domain/User/logger/LogUpdatePersonalProfileImage';

export class FakeUpdatePersonalProfileImageLoggerRepo implements LogRepository<LogDataForUpdatePersonalProfileImage> {
	save(logDTO: LogForSave<LogDataForUpdatePersonalProfileImage>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
