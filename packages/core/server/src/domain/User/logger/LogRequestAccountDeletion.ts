import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogRequestAccountDeletion extends TypedLogger<LogDataForRequestAccountDeletion> {
	public getType(): string {
		return 'requestAccountDeletion';
	}
}

export interface LogDataForRequestAccountDeletion {
	userId: string;
}
