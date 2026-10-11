import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetFeatureList extends NoDataLogger {
	public getType(): string {
		return 'getContentList';
	}
}
