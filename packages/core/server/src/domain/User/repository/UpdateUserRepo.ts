import {SaveUserDTO} from '@copor/core/domain/User/interactor/dto/SaveUserDTO';

export interface UpdateUserRepo {
	update(user: SaveUserDTO): Promise<void>
}