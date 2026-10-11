import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogToggleUserActiveStatus extends TypedLogger<LogDataForToggleUserActiveStatus> {
	public getType(): string {
		return 'toggleUserActiveStatus';
	}
}

export interface LogDataForToggleUserActiveStatus {
	id: string;
	isActive: boolean;
}
