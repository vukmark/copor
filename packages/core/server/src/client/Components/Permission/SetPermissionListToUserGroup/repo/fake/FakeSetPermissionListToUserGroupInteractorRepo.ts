import {
	SetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserGroupDTO';
import {
	SetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserGroupRepo';

export class FakeSetPermissionListToUserGroupInteractorRepo implements SetPermissionListToUserGroupRepo {
	save(saveDTO: SetPermissionListToUserGroupDTO): Promise<void> {
		return Promise.resolve();
	}
}
