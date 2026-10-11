import {GetFileListDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileListDTO';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {GetFileListRepo} from '@copor/cloud/domain/Cloud/repository/GetFileListRepo';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export class FakeGetFileListInteractorRepo implements GetFileListRepo {
	getUserUserGroupList(userId: string): Promise<NameAndIdDTO<string>[]> {
		return Promise.resolve([{
			id: 'id',
			name: 'group'
		}]);
	}
	public getFileList(actorId: string): Promise<GetFileListDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'unique-id',
					sharingType: SharingType.PRIVATE,
					name: 'simo.exe',
					path: 'path',
					creatorId: 'cid',
					creatorFirstName: 'cfn',
					creatorLastName: 'cln',
					size: 323424,
					createdAt: new Date()
				}]
			);
		});
	}
}
