import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';
import {db} from '@copor/core/client/AppDataSource';
import path from 'node:path';
import fs from 'node:fs/promises';

export class KyselyGetFileInteractorRepo implements GetItem<GetFileDTO> {
	async load(id: string): Promise<GetFileDTO> {
		const fileRecord = await db
			.selectFrom('cloudFile')
			.select([
				'id',
				'name'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!fileRecord)
			throw new Error('File not found');
		const folder = path.join(
			process.env.MEDIA_FILES_FOLDER!,
			'Cloud',
			id.substring(0, 3)
		);

		const filePath = path.join(
			folder,
			`${fileRecord.id}.${fileRecord.name.split('.').pop()}`
		);

		try {
			const file = await fs.readFile(filePath);
			const fileName = fileRecord.name.replace(/[^\w\d\-_. ]+/g, '');

			return {file, fileName};
		} catch {
			throw new Error('File not found on storage');
		}
	}
}
