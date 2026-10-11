import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetRoleList extends NoDataLogger {
	public getType(): string {
		return 'getRoleList';
	}
}