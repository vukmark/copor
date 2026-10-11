import {Generated} from '@copor/core/client/types/tables/Generated';

export interface MessageSeen {
	messageId: string;
	userId: string;
	seenAt: Generated<Date>;
}
