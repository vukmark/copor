import {News} from '@copor/news/client/News/types/News';
import {NewsRoleMap} from '@copor/news/client/News/types/NewsRoleMap';

// The News module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		news: News;
		newsRoleMap: NewsRoleMap;
	}
}
