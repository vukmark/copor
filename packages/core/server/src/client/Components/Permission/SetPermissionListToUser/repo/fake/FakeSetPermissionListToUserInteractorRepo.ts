import {SetPermissionListToUserRepo} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserRepo';
import {	SetPermissionListToUserDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserDTO';

export class FakeSetPermissionListToUserInteractorRepo implements SetPermissionListToUserRepo {
	save(saveDTO: SetPermissionListToUserDTO): Promise<void> {
		return Promise.resolve();
	}
}
