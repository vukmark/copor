import {OutboxEmailStatus} from '@copor/core/domain/Core/enum/OutboxEmailStatus';
import {Generated} from './Generated';

export interface EmailOutBox {
	id: string;
	attempts: number | null;
	lastError: string | null;
	nextAttemptAt: Date | null;
	payload: string;
	receiver: string;
	sentAt: Date | null;
	status: OutboxEmailStatus;
	subject: string;
	type: string;
	priority: Generated<number>;
	createdAt: Generated<Date>;
}
