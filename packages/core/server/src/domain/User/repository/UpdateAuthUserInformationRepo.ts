import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';

export interface UpdateAuthUserInformationRepo {
	update(input: UpdateAuthUserInformationDTO): Promise<void>;
}
