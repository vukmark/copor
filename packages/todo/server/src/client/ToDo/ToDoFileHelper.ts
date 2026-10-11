import {FileHelper, SaveFileContext} from '@copor/core/client/Core/Helpers/FileHelper';
import path from 'node:path';

export class ToDoFileHelper extends FileHelper {
	protected static getFolder(context: SaveFileContext) {
		return path.join(
			this.getMediaFilesFolder(),
			'ToDo',
			context.fileId.substring(0, 3)
		);
	}
}
