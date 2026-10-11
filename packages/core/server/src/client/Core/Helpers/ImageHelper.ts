import * as fs from 'fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class ImageHelper {
	public static getProfileImageURL(imageName: string | undefined, imageExtension: string | undefined, context: AppContext) {
		if (imageName && imageExtension)
			return context.envVariables!.PROFILE_IMAGE_PATH + imageName + '.' + imageExtension;
		return undefined;
	}

	public static getProfileImageUrlOrEmptyString(
		imageName: string | undefined,
		imageExtension: string | undefined,
		context?: AppContext
	): string {
		if (!imageName || !imageExtension || !context?.envVariables?.PROFILE_IMAGE_PATH) {
			return '';
		}
		return `${context.envVariables.PROFILE_IMAGE_PATH}${imageName}.${imageExtension}`;
	}

	// For consumers that need a real, always-fetchable URL rather than an empty
	// string to fall back on (e.g. the native CallKit UI, which fetches the
	// avatar itself and has no concept of "no picture, show initials") — falls
	// back to a generated colored-initials avatar instead of a broken/missing image.
	public static getProfileImageOrInitialsAvatarUrl(
		imageName: string | undefined,
		imageExtension: string | undefined,
		fullName: string,
		context?: AppContext
	): string {
		const profileImageUrl = this.getProfileImageUrlOrEmptyString(imageName, imageExtension, context);

		if (profileImageUrl) return profileImageUrl;

		const profileImagePath = context?.envVariables?.PROFILE_IMAGE_PATH ?? '';
		const baseUrl = profileImagePath.replace(/\/assets\/.*$/, '');

		return `${baseUrl}/avatar/initials/${encodeURIComponent(fullName)}`;
	}

	public static async saveImageFile(
		folderPath: string,
		fileName: string,
		extension: string,
		imageBuffer: Buffer
	): Promise<string> {
		const fullFileName = `${fileName}.${extension}`;
		const filePath = path.join(folderPath, fullFileName);

		await fs.writeFile(filePath, imageBuffer);

		return filePath;
	}
	public static async getImageMetadata(
		imageBuffer: Buffer
	): Promise<ImageMetadataDTO> {
		const metadata = await sharp(imageBuffer).metadata();

		return {
			width: metadata.width ?? 0,
			height: metadata.height ?? 0,
			extension: metadata.format ?? 'unknown',
			fileSize: imageBuffer.length
		};
	}
	public static async deleteImageFile(
		folderPath: string,
		fileName: string,
		extension: string
	): Promise<void> {
		const filePath = path.join(folderPath, `${fileName}.${extension}`);

		try {
			await fs.unlink(filePath);
			console.log(`Deleted image file: ${filePath}`);
		} catch (error: any) {
			if (error.code === 'ENOENT') {
				console.warn(`Image file not found for deletion: ${filePath}`);
			} else {
				throw error;
			}
		}
	}
}
export interface ImageMetadataDTO {
	width: number;
	height: number;
	extension: string;
	fileSize: number;
}