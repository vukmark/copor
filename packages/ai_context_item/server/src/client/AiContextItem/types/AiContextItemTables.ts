import {AiContextItem} from '@copor/ai_context_item/client/AiContextItem/types/AiContextItem';

// The AiContextItem module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		aiContextItem: AiContextItem;
	}
}
