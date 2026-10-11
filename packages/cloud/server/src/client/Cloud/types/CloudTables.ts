import {CloudCategoryTable} from '@copor/cloud/client/Cloud/types/CloudCategoryTable';
import {CloudFile} from '@copor/cloud/client/Cloud/types/CloudFile';
import {FileTagMap} from '@copor/cloud/client/Cloud/types/FileTagMap';
import {FileUserMap} from '@copor/cloud/client/Cloud/types/FileUserMap';
import {FileUserGroupMap} from '@copor/cloud/client/Cloud/types/fileUserGroupMap';

// The Cloud module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		cloudCategory: CloudCategoryTable;
		cloudFile: CloudFile;
		fileTagMap: FileTagMap;
		fileUserMap: FileUserMap;
		fileUserGroupMap: FileUserGroupMap;
	}
}
