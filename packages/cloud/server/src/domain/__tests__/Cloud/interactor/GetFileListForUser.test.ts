import {GetFileListForUser} from '@copor/cloud/domain/Cloud/interactor/GetFileListForUser';
import {GetFileListDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileListDTO';
import {GetFileListRepo} from '@copor/cloud/domain/Cloud/repository/GetFileListRepo';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {CloudFolderNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudFolderNode';
import {CloudNode, CloudNodeType} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';

function getGroupsChildren(result: CloudNode[]): CloudNode[] {
	const groupsFolder = result.find((node) => node.name === 'GROUPS') as CloudFolderNode | undefined;

	return groupsFolder?.children ?? [];
}

describe('Get list of files for a user', () => {
	const mockRepo: jest.Mocked<GetFileListRepo> = {
		getFileList: jest.fn(),
		getUserUserGroupList: jest.fn()
	};
	const getFileListResponse: GetFileListDTO[] = [];
	const getFileList: GetFileListForUser = new GetFileListForUser('actorId', mockRepo);

	it('Should list all files', async () => {
		mockRepo.getFileList.mockResolvedValue(getFileListResponse);
		mockRepo.getUserUserGroupList.mockResolvedValue([]);

		const result = await getFileList.execute();

		const myFiles = result.find((node) => node.name === 'MY_FILES') as CloudFolderNode;

		expect(myFiles.children.map((node) => node.name)).toEqual(['PRIVATE', 'PUBLIC']);
	});

	it('Should let a user upload to their own Public folder and see files shared to them there', async () => {
		const selfUploadedFile: GetFileListDTO = {
			id: 'self-file',
			sharingType: SharingType.PUBLIC,
			path: '',
			name: 'own-upload.pdf',
			creatorId: 'actorId',
			creatorFirstName: 'a',
			creatorLastName: 'b',
			createdAt: new Date(),
			size: 10,
			targetUserId: 'actorId'
		};
		const sharedFile: GetFileListDTO = {
			id: 'shared-file',
			sharingType: SharingType.PUBLIC,
			path: '',
			name: 'shared.pdf',
			creatorId: 'otherUserId',
			creatorFirstName: 'o',
			creatorLastName: 'r',
			createdAt: new Date(),
			size: 10,
			targetUserId: 'actorId'
		};

		mockRepo.getFileList.mockResolvedValue([selfUploadedFile, sharedFile]);
		mockRepo.getUserUserGroupList.mockResolvedValue([]);

		const result = await getFileList.execute();

		const myFiles = result.find((node) => node.name === 'MY_FILES') as CloudFolderNode;

		expect(myFiles).toBeDefined();

		const publicFolder = myFiles.children.find((node) => node.name === 'PUBLIC') as CloudFolderNode;

		expect(publicFolder).toBeDefined();
		expect(publicFolder.uploadEndpoint).toBe('/cloud/PUBLIC/');

		const fileNames = publicFolder.children
			.filter((node) => node.type === CloudNodeType.FILE)
			.map((node) => node.name);

		expect(fileNames).toEqual(['own-upload.pdf', 'shared.pdf']);
	});

	it('Should not put a file targeted at another user into the actor\'s own Public folder', async () => {
		const otherUsersFile: GetFileListDTO = {
			id: 'other-file',
			sharingType: SharingType.PUBLIC,
			path: '',
			name: 'for-other.pdf',
			creatorId: 'actorId',
			creatorFirstName: 'a',
			creatorLastName: 'b',
			createdAt: new Date(),
			size: 10,
			targetUserId: 'otherUserId'
		};

		mockRepo.getFileList.mockResolvedValue([otherUsersFile]);
		mockRepo.getUserUserGroupList.mockResolvedValue([]);

		const result = await getFileList.execute();

		const myFiles = result.find((node) => node.name === 'MY_FILES') as CloudFolderNode;
		const publicFolder = myFiles.children.find((node) => node.name === 'PUBLIC') as CloudFolderNode;

		expect(publicFolder.children).toHaveLength(0);
	});

	it('Should nest USER_GROUP folders under a category folder inside GROUPS', async () => {
		mockRepo.getFileList.mockResolvedValue(getFileListResponse);
		mockRepo.getUserUserGroupList.mockResolvedValue([{id: 'ug-1', name: 'UG One'}]);

		const result = await getFileList.execute();
		const groupsChildren = getGroupsChildren(result);

		expect(groupsChildren.map((f) => f.name)).toEqual(['USER_GROUP']);

		const userGroupCategory = groupsChildren.find((f) => f.name === 'USER_GROUP') as CloudFolderNode;

		expect(userGroupCategory.children.map((f) => f.name)).toEqual(['UG One']);
	});

	it('Should not create a USER_GROUP category folder when there are no user groups', async () => {
		mockRepo.getFileList.mockResolvedValue(getFileListResponse);
		mockRepo.getUserUserGroupList.mockResolvedValue([]);

		const result = await getFileList.execute();
		const groupsChildren = getGroupsChildren(result);

		expect(groupsChildren.some((f) => f.name === 'USER_GROUP')).toBe(false);
	});
});
