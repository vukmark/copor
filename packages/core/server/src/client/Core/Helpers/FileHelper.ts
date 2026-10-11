import * as fs from 'node:fs/promises';
import {FileMetadataDTO} from '@copor/core/client/Core/Helpers/FileMetadataDTO';
import path from 'node:path';

export abstract class FileHelper {
	public static async saveFile(file: Express.Multer.File, context: SaveFileContext) {
		const uploadFolder = this.getFolder(context);

		await fs.mkdir(uploadFolder, {recursive: true});
		const metadata = this.getFileMetadata(file);

		const fullFileName = `${context.fileId}.${metadata.extension}`;
		const filePath = path.join(uploadFolder, fullFileName);

		await fs.writeFile(filePath, file.buffer);
	}
	public static getFileMetadata(
		file: Express.Multer.File
	): FileMetadataDTO {
		const extension = file.originalname.split('.').pop();

		return {
			extension: extension ?? 'undefined',
			fileSize: file.buffer.length
		};
	}
	public static async deleteFile(
		context: SaveFileContext,
		extension: string
	): Promise<void> {
		const folder = this.getFolder(context);
		const fileName = `${context.fileId}.${extension}`;
		const filePath = path.join(folder, fileName);

		try {
			await fs.unlink(filePath);
		} catch (error: unknown) {
			console.log(error);
		}
	}

	protected static getFolder(context: SaveFileContext): string {
		throw new Error('getFolder must be implemented');
	}

	protected static getMediaFilesFolder(): string {
		return process.env.MEDIA_FILES_FOLDER!;
	}
}
export interface SaveFileContext {
	fileId: string;
	userId?: string;
}