import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetNativeLanguageList extends NoDataLogger {
	getType(): string {
		return 'getNativeLanguageList';
	}
}