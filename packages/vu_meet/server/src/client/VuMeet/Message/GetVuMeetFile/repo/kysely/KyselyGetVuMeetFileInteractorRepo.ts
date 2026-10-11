
import {GetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileDTO';
import {GetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetVuMeetFileRepo';
import path from 'node:path';
import {db} from '@copor/core/client/AppDataSource';
import * as fs from 'node:fs/promises';

export class KyselyGetVuMeetFileInteractorRepo implements GetVuMeetFileRepo {
	async load(messageId: string, actorId: string): Promise<GetVuMeetFileDTO> {
		const message = await db
			.selectFrom('message')
			.select(['id', 'extension', 'type', 'content'])
			.where('id', '=', messageId)
			.executeTakeFirst();

		if (!message)
			throw new Error('Private message not found');

		if (!message.extension)
			throw new Error('File extension missing');

		const folder = path.join(
			process.cwd(),
			'MediaFiles',
			'Private',
			'VuMeet',
			actorId.substring(0, 2),
			actorId
		);

		const filePath = path.join(
			folder,
			`${message.id}.${message.extension}`
		);

		try {
			const file = await fs.readFile(filePath);
			const safeContent = message.content.replace(/[^\w\d-_\. ]+/g, '');

			const fileName = `${safeContent}.${message.extension}`;

			return {file, fileName};
		} catch {
			throw new Error('File not found on storage');
		}
	}
}
