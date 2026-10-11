import {GetFileListDTO} from './dto/GetFileListDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetFileListRepo} from '@copor/cloud/domain/Cloud/repository/GetFileListRepo';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {CloudNode, CloudNodeType} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';
import {CloudFolderNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFolderNode';
import {CloudFileNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFileNode';

export class GetFileListForUser extends ExecuteUseCase<string, GetFileListRepo, CloudNode[]> {
	public async execute(): Promise<CloudNode[]> {
		const files = await this.repository.getFileList(this.input);
		const userGroups = await this.repository.getUserUserGroupList(this.input);

		return this.buildStructure(files, userGroups);
	}

	private buildStructure(
		files: GetFileListDTO[],
		userGroups: NameAndIdDTO[]
	): CloudNode[] {
		const rootNodes: CloudFolderNode[] = [];
		const groupNodes: CloudFolderNode[] = [];

		const userGroupFolders: CloudFolderNode[] = [];

		this.createUserGroupRootDirs(userGroups, userGroupFolders);
		this.createGroupCategoryDir('USER_GROUP', userGroupFolders, groupNodes);

		this.createGroupsRootDir(rootNodes, groupNodes);

		const privateFolder = this.createFolder('PRIVATE', '/cloud/PRIVATE/');
		const publicFolder = this.createFolder('PUBLIC', '/cloud/PUBLIC/');

		this.createMyFilesRootDir(rootNodes, privateFolder, publicFolder);

		for (const file of files) {
			this.insertIntoRoot(groupNodes, userGroupFolders, file, privateFolder, publicFolder);
		}

		return rootNodes;
	}

	private createGroupsRootDir(rootNodes: CloudFolderNode[], groupNodes: CloudFolderNode[]) {
		if (groupNodes.length === 0) {
			return;
		}

		const groupsFolder = this.createFolder('GROUPS');

		groupsFolder.children.push(...groupNodes);

		rootNodes.push(groupsFolder);
	}

	private createGroupCategoryDir(name: string, categoryFolders: CloudFolderNode[], groupNodes: CloudFolderNode[]) {
		if (categoryFolders.length === 0) {
			return;
		}

		const categoryFolder = this.createFolder(name);

		categoryFolder.children.push(...categoryFolders);

		groupNodes.push(categoryFolder);
	}

	private createMyFilesRootDir(
		rootNodes: CloudFolderNode[],
		privateFolder: CloudFolderNode,
		publicFolder: CloudFolderNode
	) {
		const myFilesFolder = this.createFolder('MY_FILES');

		myFilesFolder.children.push(privateFolder);
		myFilesFolder.children.push(publicFolder);

		rootNodes.unshift(myFilesFolder);
	}

	private createUserGroupRootDirs(groups: NameAndIdDTO[], groupNodes: CloudFolderNode[]) {
		for (const group of groups) {
			const groupFolder = this.createFolder(
				group.name,
				`/cloud/USER_GROUP/${group.id}/`
			);

			groupFolder.path = group.id;

			groupNodes.push(groupFolder);
		}
	}

	private mapFile(file: GetFileListDTO): CloudFileNode {
		return {
			type: CloudNodeType.FILE,
			id: file.id,
			name: file.name,
			path: file.path,
			size: file.size,
			createdAt: file.createdAt,
			description: file.description,
			creator: {
				id: file.creatorId,
				firstName: file.creatorFirstName,
				lastName: file.creatorLastName
			}
		};
	}

	private createFolder(name: string, uploadEndpoint = ''): CloudFolderNode {
		return {
			type: CloudNodeType.FOLDER,
			name,
			path: '',
			uploadEndpoint,
			children: []
		};
	}

	private insertIntoRoot(
		groupNodes: CloudFolderNode[],
		userGroupFolders: CloudFolderNode[],
		file: GetFileListDTO,
		privateFolder: CloudFolderNode,
		publicFolder: CloudFolderNode
	) {
		if (file.sharingType === SharingType.USER_GROUP && file.groupId) {
			const groupFolder = userGroupFolders.find(
				(f) => f.path === file.groupId
			);

			if (!groupFolder)
				return;

			this.insertFile(groupFolder, file, file.sharingType);
			return;
		}
		if (file.sharingType === SharingType.PUBLIC && file.targetUserId) {
			this.insertIntoPublicFolder(file, publicFolder);
			return;
		}
		if (file.sharingType === SharingType.PRIVATE) {
			this.insertFile(privateFolder, file, file.sharingType);
			return;
		}

		const rootFolder = groupNodes.find(
			(f) => f.name === file.sharingType as string
		);

		if (!rootFolder)
			return;

		this.insertFile(rootFolder, file, file.sharingType);
	}

	private insertIntoPublicFolder(
		file: GetFileListDTO,
		publicFolder: CloudFolderNode
	) {
		// The actor's own Public folder only holds files they own (uploaded)
		// or that were placed in their folder — not files placed there by others.
		const actorOwnsFolder = file.targetUserId === this.input;

		if (actorOwnsFolder) {
			this.insertFile(publicFolder, file, file.sharingType);
		}
	}

	private insertFile(
		root: CloudFolderNode,
		file: GetFileListDTO,
		sharingType: SharingType
	) {
		const pathParts = file.path.split('/').filter(Boolean);

		let currentFolder = root;
		let currentPath = '';

		const groupId = file.groupId;

		for (const part of pathParts) {
			currentPath += `${part}/`;

			let nextFolder = currentFolder.children
				// eslint-disable-next-line jest/unbound-method
				.filter(this.isFolder)
				.find((folder) => folder.name === part);

			if (!nextFolder) {
				nextFolder = this.createFolder(
					part,
					this.buildUploadEndpoint(sharingType, currentPath, groupId, file.targetUserId)
				);

				currentFolder.children.push(nextFolder);
			}

			currentFolder = nextFolder;
		}

		currentFolder.children.push(this.mapFile(file));
	}
	private isFolder(node: CloudNode): node is CloudFolderNode {
		return node.type === CloudNodeType.FOLDER;
	}

	private buildUploadEndpoint(
		sharingType: SharingType,
		path: string,
		groupId?: string,
		targetUserId?: string
	): string {
		if (sharingType === SharingType.PUBLIC && targetUserId) {
			return `/cloud/PUBLIC/${targetUserId}/${path}`;
		}
		if (sharingType === SharingType.PUBLIC) {
			return `/cloud/PUBLIC/${path}`;
		}
		if (sharingType === SharingType.USER_GROUP && groupId) {
			return `/cloud/${sharingType}/${groupId}/${path}`;
		}

		return `/cloud/${sharingType}/${path}`;
	}
}
