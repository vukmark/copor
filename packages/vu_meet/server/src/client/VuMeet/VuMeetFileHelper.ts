import {FileHelper, SaveFileContext} from '@copor/core/client/Core/Helpers/FileHelper';
import path from 'node:path';

export class VuMeetFileHelper extends FileHelper {
	protected static getFolder(context: SaveFileContext) {
		if (!context.userId)
			throw new Error('User id is required when saving vuMeet file');
		return path.join(
			this.getMediaFilesFolder(),
			'Private',
			'VuMeet',
			context.userId.substring(0, 2),
			context.userId
		);
	}
}
