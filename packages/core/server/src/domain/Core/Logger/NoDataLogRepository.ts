import {LogForSaveWithNoData} from './LogForSaveWithNoData';

export interface NoDataLogRepository {
	save(logDto: LogForSaveWithNoData): Promise<void>;
}
