import {ContentItem} from '@copor/core/client/ContentItem/types/ContentItem';
import {ContentItemRoleMap} from '@copor/core/client/ContentItem/types/ContentItemRoleMap';

// The ContentItem module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		contentItem: ContentItem;
		contentItemRoleMap: ContentItemRoleMap;
	}
}
