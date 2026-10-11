import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetFileViewModel} from '@copor/cloud/client/Cloud/GetFileList/GetFileViewModel';
import {GetFolderViewModel} from '@copor/cloud/client/Cloud/GetFileList/GetFolderViewModel';
import i18next from 'i18next';
import {CloudNode, CloudNodeType} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';
import {CloudFolderNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFolderNode';
import {CloudFileNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFileNode';
import {CloudFileIcon} from '@copor/cloud/client/Cloud/enum/CloudFileIcon';

export class GetFileListPresenter extends PresenterInstance<CloudNode[], GetFolderViewModel[]> {
	public present(): GetFolderViewModel[] {
		return this.input
			.filter((node): node is CloudFolderNode => node.type === CloudNodeType.FOLDER)
			.map((folder) => this.mapFolder(folder));
	}
	private mapFolder(folder: CloudFolderNode): GetFolderViewModel {
		const subfolders: GetFolderViewModel[] = [];
		const files: GetFileViewModel[] = [];

		for (const child of folder.children) {
			if (child.type === CloudNodeType.FOLDER) {
				subfolders.push(this.mapFolder(child));
			} else {
				files.push(this.mapFile(child));
			}
		}

		return {
			name: this.translateFolderName(folder.name),
			uploadEndpoint: folder.uploadEndpoint ?? '',
			subfolders,
			files
		};
	}
	private mapFile(file: CloudFileNode): GetFileViewModel {
		const extension = file.name.includes('.')
			? file.name.split('.').pop() ?? ''
			: '';

		return {
			name: file.name,
			size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
			description: file.description ?? '',
			extension,
			thumbnail: this.getThumbnailURL(extension),
			downloadURL: `/cloud/${file.id}`,
			creatorId: file.creator.id,
			creatorName: `${file.creator.firstName} ${file.creator.lastName}`,
			createdAt: file.createdAt.toString()
		};
	}
	private translateFolderName(name: string): string {
		i18next.setDefaultNamespace('cloud');

		const translatableKeys = [
			'USER_GROUP',
			'PRIVATE',
			'PUBLIC',
			'MY_FILES',
			'GROUPS'
		];

		if (translatableKeys.includes(name)) {
			return i18next.t(`translationStringList.${name}`);
		}

		return name;
	}

	private getThumbnailURL(extension: string): string {
		const iconMap: Record<string, string> = {
			'pdf': CloudFileIcon.PDF,

			'doc': CloudFileIcon.DOC,
			'docx': CloudFileIcon.DOC,
			'odt': CloudFileIcon.DOC,
			'rtf': CloudFileIcon.DOC,

			'xls': CloudFileIcon.XLS,
			'xlsx': CloudFileIcon.XLS,
			'ods': CloudFileIcon.XLS,
			'csv': CloudFileIcon.XLS,

			'ppt': CloudFileIcon.PPT,
			'pptx': CloudFileIcon.PPT,
			'odp': CloudFileIcon.PPT,

			'jpg': CloudFileIcon.IMAGE,
			'jpeg': CloudFileIcon.IMAGE,
			'png': CloudFileIcon.IMAGE,
			'gif': CloudFileIcon.IMAGE,
			'bmp': CloudFileIcon.IMAGE,
			'webp': CloudFileIcon.IMAGE,
			'svg': CloudFileIcon.IMAGE,
			'tif': CloudFileIcon.IMAGE,
			'tiff': CloudFileIcon.IMAGE,
			'heic': CloudFileIcon.IMAGE,
			'heif': CloudFileIcon.IMAGE,
			'ico': CloudFileIcon.IMAGE,

			'txt': CloudFileIcon.TXT,
			'md': CloudFileIcon.TXT,

			'zip': CloudFileIcon.ARCHIVE,
			'rar': CloudFileIcon.ARCHIVE,
			'7z': CloudFileIcon.ARCHIVE,
			'tar': CloudFileIcon.ARCHIVE,
			'gz': CloudFileIcon.ARCHIVE,
			'bz2': CloudFileIcon.ARCHIVE,
			'xz': CloudFileIcon.ARCHIVE,

			// Video
			'mp4': CloudFileIcon.VIDEO,
			'mkv': CloudFileIcon.VIDEO,
			'avi': CloudFileIcon.VIDEO,
			'mov': CloudFileIcon.VIDEO,
			'wmv': CloudFileIcon.VIDEO,
			'flv': CloudFileIcon.VIDEO,
			'webm': CloudFileIcon.VIDEO,
			'm4v': CloudFileIcon.VIDEO,
			'mpeg': CloudFileIcon.VIDEO,
			'mpg': CloudFileIcon.VIDEO,
			'3gp': CloudFileIcon.VIDEO,
			'ts': CloudFileIcon.VIDEO,
			'm2ts': CloudFileIcon.VIDEO,
			'ogv': CloudFileIcon.VIDEO,

			// Audio
			'mp3': CloudFileIcon.AUDIO,
			'wav': CloudFileIcon.AUDIO,
			'flac': CloudFileIcon.AUDIO,
			'aac': CloudFileIcon.AUDIO,
			'm4a': CloudFileIcon.AUDIO,
			'ogg': CloudFileIcon.AUDIO,
			'opus': CloudFileIcon.AUDIO,
			'wma': CloudFileIcon.AUDIO,
			'aiff': CloudFileIcon.AUDIO,
			'alac': CloudFileIcon.AUDIO,
			'midi': CloudFileIcon.AUDIO,
			'mid': CloudFileIcon.AUDIO,
			'amr': CloudFileIcon.AUDIO
		};

		return iconMap[extension.toLowerCase()] ?? CloudFileIcon.DEFAULT;
	}
}

