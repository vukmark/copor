import {SaveRoleRepo} from '@copor/core/domain/Components/Role/repository/SaveRoleRepo';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';

export class FakeUpdateRoleInteractorRepo implements SaveRoleRepo {
	save(saveDTO: SaveRoleDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
