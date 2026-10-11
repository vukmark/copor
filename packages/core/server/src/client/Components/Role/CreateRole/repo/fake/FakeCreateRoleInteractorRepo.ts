import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';

export class FakeCreateRoleInteractorRepo implements SaveItem<SaveRoleDTO> {
	save(saveDTO: SaveRoleDTO): Promise<void> {
		return Promise.resolve();
	}
}
