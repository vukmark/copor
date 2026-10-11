import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';

export interface UpdateUserLoginInformationRepo {
	save(input: UpdateUserLoginInformationDTO): Promise<void>
}