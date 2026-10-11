import {LogForSave} from './LogForSave';

export interface LogRepository<T> {
	save(logDTO: LogForSave<T>): Promise<void>;
}