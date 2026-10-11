import {FileHelper, SaveFileContext} from '@copor/core/client/Core/Helpers/FileHelper';
import path from 'node:path';

export class CloudFileHelper extends FileHelper {
	protected static getFolder(context: SaveFileContext) {
		return path.join(
			this.getMediaFilesFolder(),
			'Cloud',
			context.fileId.substring(0, 3)
		);
	}
}