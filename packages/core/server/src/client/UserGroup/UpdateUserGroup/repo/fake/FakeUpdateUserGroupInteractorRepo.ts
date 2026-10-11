import {SaveUserGroupRepo} from '@copor/core/domain/UserGroup/repository/SaveUserGroupRepo';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';

export class FakeUpdateUserGroupInteractorRepo implements SaveUserGroupRepo {
	save(saveDTO: SaveUserGroupDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
