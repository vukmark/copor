import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCancelAccountDeletion extends TypedLogger<LogDataForCancelAccountDeletion> {
	public getType(): string {
		return 'cancelAccountDeletion';
	}
}

export interface LogDataForCancelAccountDeletion {
	userId: string;
}
