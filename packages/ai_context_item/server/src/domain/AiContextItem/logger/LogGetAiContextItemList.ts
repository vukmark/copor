import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetAiContextItemList extends NoDataLogger {
	public getType(): string {
		return 'getAiContextItemList';
	}
}