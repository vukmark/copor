import {GetFileListDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileListDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export interface GetFileListRepo {
	getFileList(actorId: string): Promise<GetFileListDTO[]>;
	getUserUserGroupList(userId: string): Promise<NameAndIdDTO[]>;
}
