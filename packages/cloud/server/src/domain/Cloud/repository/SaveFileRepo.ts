import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

export interface FindUserGroupFileDTO {
	userGroupId: string;
	name: string;
	path: string;
}

export interface SaveFileRepo extends SaveItem<SaveFileDTO> {
	findUserGroupFileId(input: FindUserGroupFileDTO): Promise<string | undefined>;
}
